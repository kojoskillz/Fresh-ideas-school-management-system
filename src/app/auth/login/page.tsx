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
    <div className="bg-auth min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-[500px] bg-white shadow-primary/25 shadow-sm px-10 pt-10 pb-16 rounded-md">
        <h3 className="font-bold text-center mb-8">Welcome!</h3>

        <Form {...form}>
          <FormDescription className="text-primary font-bold text-xl mb-5">
            Sign in
          </FormDescription>
          <form method="POST" onSubmit={form.handleSubmit(handleSubmitHandler)}>
            <div className="space-y-4 mb-8">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">
                      Phone number or Email:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                        placeholder="Enter email"
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
                    <FormLabel className="text-primary font-medium">
                      Password:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center pb-16">
              <Button
                onClick={() => console.log(form.getValues())}
                className="px-12 text-lg"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex justify-center">
          <p className="text-primary/60 pb-10 font-medium">
            Don’t have an account?{" "}
            <Link
              className="hover:text-primary transition-all duration-300 ease-linear"
              href="/auth/sign-up"
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
