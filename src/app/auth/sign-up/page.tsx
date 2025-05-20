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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const positions = ["ADMIN", "TEACHER", "STUDENT"] as const;

const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email or phone is required")
      .email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    lastName: z.string().min(1, "Surname/First last is required"),
    firstName: z.string().min(1, "Surname/First last is required"),
    phone: z.string().min(11, "Enter a valid number"),
    position: z.enum(positions, { required_error: "Select a position" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

type LoginFormValues = z.infer<typeof loginSchema>;

function Page() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      lastName: "",
      phone: "",
      firstName: "",
      position: undefined,
    },
  });

  const handleSubmitHandler = (data: LoginFormValues) => {
    console.log(data);
  };

  return (
    <div className="bg-auth min-h-dvh flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white shadow-primary/25 shadow-sm px-10 lg:p-16 pt-10 pb-16 rounded-md">
        {/* <h3 className="font-bold text-center mb-8">Welcome!</h3> */}

        <Form {...form}>
          <FormDescription className="text-primary font-bold text-xl mb-5">
            Sign up
          </FormDescription>
          <form
            method="POST"
            className=""
            onSubmit={form.handleSubmit(handleSubmitHandler)}
          >
            <div className="flex w-full gap-10">
              <div className="space-y-4 mb-8 w-full">
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Surname
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                          placeholder="Enter surname/last name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                          placeholder="Enter first name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                          placeholder="Enter email address"
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
                        Password
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
              <div className="space-y-4 mb-8 w-full flex gap-[79px] flex-col justify-end">
                <FormField
                  name="position"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Position
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm shadow-sm shadow-primary/20">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={positions[0]}>
                              {positions[0]}
                            </SelectItem>
                            <SelectSeparator />
                            <SelectItem value={positions[1]}>
                              {positions[1]}
                            </SelectItem>
                            <SelectSeparator />
                            <SelectItem value={positions[2]}>
                              {positions[2]}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="confirm_password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">
                        Confirm your Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-primary-foreground rounded-lg shadow-sm shadow-[#5F5F5F40]"
                          placeholder="Confirm password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center pb-16">
              <Button className="px-12 text-lg" type="submit">
                Sign up
              </Button>
            </div>
          </form>
        </Form>
        <div className="flex justify-center">
          <p className="text-primary/60 pb-10 font-medium">
            Already have an account?{" "}
            <Link
              className="hover:text-primary transition-all duration-300 ease-linear"
              href="/auth/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
