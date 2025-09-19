"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/lib/schemas/authSchema";
import { useAuth } from "@/hooks/use-auth";
import { Loader, Eye, EyeClosed, EyeOff } from "lucide-react";
import Image from "next/image";

function Page() {
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitHandler = async (data: LoginFormValues) =>
    loginMutation.mutate(data);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-blue-100 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-10">
        <div className="flex flex-col items-center gap-5">
          <Link href="/" passHref>
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-primary mb-2">
            Welcome
          </h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitHandler)}
            className="space-y-6"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-primary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email"
                      className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 text-base transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-primary">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="anything"
                        className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 text-base transition-all"
                      />
                      <Button
                        aria-label="Password visibility toggle button"
                        type="button"
                        className="absolute top-1/2 -translate-y-1/2 right-0.5"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        color="icon"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <div className="flex items-center justify-between ml-auto">
                    <FormMessage />
                    <div className="text-sm text-primary text-right">
                      <Link className="" href="/auth/forgot-password">
                        <span className="underline font-semibold">
                          Forgot password?
                        </span>
                      </Link>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <>
                  <Loader className="animate-spin" />
                  <span> Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
