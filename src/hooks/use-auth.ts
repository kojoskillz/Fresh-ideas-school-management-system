import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginFormValues } from "@/lib/schemas/authSchema";
import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
import { UserRole } from "@/types/user";
export function useAuth() {
  const context = useContext(AuthContext);
  const router = useRouter();

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }


  const loginMutation = useMutation({
    mutationFn: async (formValue: LoginFormValues) =>
      await axios.post(apis.auth.login, formValue),
    onSuccess: (res) => {
      const { tokens, user } = res.data;

      setCookie("access_token", tokens?.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      setCookie("refresh_token", tokens?.refresh_token, {
        maxAge: 30 * 24 * 60 * 60,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      toast("Login Successfully", {
        description: `Welcome back, ${user?.name}`,
      });

      context?.setState((prev) => ({
        ...prev,
        user: user,
        isAuthenticated: true,
      }));

      const wasManualLogout = localStorage.getItem("manual_logout") === "true";

      if (wasManualLogout) {
        localStorage.removeItem("manual_logout");
      }

      const urlParams = new URLSearchParams(window.location.search);
      const from = urlParams.get("from");

      if (!wasManualLogout && from && !from.startsWith("/auth")) {
        return router.push(from);
      }

      if (user.role === "SUPER_ADMIN") {
        return router.push(`/admin/dashboard`);
      }

      router.push(`/${user?.role.toLowerCase()}/dashboard`);
    },

    onError: (err) => {
      handleApiError(err, {
        title: "Login Error",
        description: "An error occured, try again later",
      });
    },
  });

 
  const logoutMutation = useMutation({
    mutationFn: async () => await axios.post(apis.auth.logout),
    onSuccess: () => {
      deleteCookie("access_token");
      deleteCookie("refresh_token");

      localStorage.setItem("manual_logout", "true");

      context?.setState((prev) => ({
        ...prev,
        user: undefined,
        isAuthenticated: false,
      }));

      router.push("/auth/login");

      toast.info("Logout Successfully", {
        description: "You have been logged out successfully",
      });
    },
    onError: (err) => {
      console.error(err);
      toast.error("Logout Failed", {
        description: "Unable to log out. Please try again.",
      });
    },
  });

  return { ...context, loginMutation, logoutMutation };
}
