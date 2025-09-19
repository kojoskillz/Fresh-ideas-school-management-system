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
        maxAge: 60 * 15,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      setCookie("refresh_token", tokens?.refresh_token, {
        maxAge: 60 * 60 * 24 * 7,
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

      switch (user.role) {
        case "SUPER_ADMIN":
        case "ADMIN":
          return router.push("/admin_section/dashboard");
        case "TEACHER":
          return router.push("/teacher_section/dashboard");
        case "STUDENT":
          return router.push("student_section/dashboard");
        default:
          throw new Error("Invalid User role");
      }
    },

    onError: (err) => {
      console.log(err);
      handleApiError(err, {
        title: "Login Error",
        description: "An error occured, try again later",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => await axios.post(apis.auth.logout),
    onSuccess: () => {
      router.push("/auth/login");
      deleteCookie("access_token");
      deleteCookie("refresh_token");
    },
    onError: (err) => {
      console.log(err);
    },
  });



  return { ...context, loginMutation, logoutMutation};
}
