"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValue,
} from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormLabel } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

function ForgotPassword() {
  const form = useForm<ForgotPasswordFormValue>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitHandler = async (data: ForgotPasswordFormValue) => {
    console.log(data);
  };
  return (
    <div className="min-h-dvh flex items-center justify-center bg-blue-100 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-10">
        <div className="flex flex-col items-center gap-5">
          <Link href="/" passHref>
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-primary mb-2">
            Reset Password
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
                  <div className="flex items-center justify-between">
                    <FormMessage />
                    <div className="text-sm text-primary text-right">
                      <span>Remember password? </span>
                      <Link className="font-semibold group" href="/auth/login">
                        <span className="underline">Login</span>
                      </Link>
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
