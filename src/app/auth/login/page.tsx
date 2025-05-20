"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormDescription,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email or phone is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Page() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitHandler = (data: LoginFormValues) => {
    console.log(data);
    router.push("/admin_section/dashboard");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-blue-100 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-extrabold text-center text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your admin account
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitHandler)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-primary">Email or Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="you@example.com"
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
                  <FormLabel className="text-sm font-medium text-primary">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 text-base transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
            >
              Sign In
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
