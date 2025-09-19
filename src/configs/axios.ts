import axios, { AxiosError } from "axios";
import { getCookie, deleteCookie, setCookie } from "cookies-next";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/v1/",
});

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

customAxios.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refresh_token");

      if (!refreshToken) {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return customAxios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const resp = await customAxios.post(`/auth/refresh`, {
          refresh_token: refreshToken,
        });

        customAxios.defaults.headers.common["Authorization"] =
          "Bearer " + resp.data.tokens.access_token;
        setCookie("access_token", resp.data.tokens.access_token, {
          maxAge: 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        setCookie("refresh_token", resp.data.tokens.refresh_token, {
          maxAge: 60 * 60 * 24 * 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        processQueue(null, resp.data.tokens.access_token);

        return customAxios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
