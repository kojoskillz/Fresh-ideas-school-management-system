"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormLabel,
  FormDescription,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const positions = ["ADMIN", "TEACHER", "STUDENT"] as const;

const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email or phone is required")
      .email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Password must be at least 6 characters"),
    lastName: z.string().min(1, "Surname/First last is required"),
    firstName: z.string().min(1, "Surname/First last is required"),
    phone: z.string().min(11, "Enter a valid number"),
    position: z.enum(positions, { required_error: "Select a position" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

function Page() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      lastName: "",
      firstName: "",
      phone: "",
      position: undefined,
    },
  });

  const handleSubmitHandler = (data: SignUpFormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-6">
      <div
        className="
          w-full max-w-2xl
          bg-white
          rounded-2xl
          shadow-xl
          p-10
          border border-transparent
        "
      >
        <Form {...form}>
          <FormDescription className="text-primary font-extrabold text-3xl mb-10 text-center tracking-wide">
            Create Your Account
          </FormDescription>

          <form onSubmit={form.handleSubmit(handleSubmitHandler)} className="space-y-8" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Surname
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter surname/last name"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
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
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Phone number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter phone number"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
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
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        First name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter first name"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
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
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter email address"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
                        />
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
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirm password"
                          className="
                            bg-gray-50
                            shadow-sm
                            border border-gray-300
                            rounded-lg
                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                            transition
                          "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="position"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-semibold tracking-tight">
                        Position
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger
                            className="
                              w-full
                              bg-gray-50
                              border border-gray-300
                              rounded-lg
                              shadow-sm
                              focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                              transition
                              cursor-pointer
                              h-10
                              flex items-center
                              px-3
                            "
                          >
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent
                            className="
                              bg-white
                              rounded-md
                              shadow-lg
                              border border-gray-200
                              py-1
                              max-h-60
                              overflow-auto
                            "
                          >
                            {positions.map((role) => (
                              <SelectItem
                                key={role}
                                value={role}
                                className="
                                  cursor-pointer
                                  select-none
                                  py-2
                                  px-4
                                  hover:bg-blue-100
                                  data-[highlighted]:bg-blue-200
                                  data-[selected]:font-semibold
                                "
                              >
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                className="px-14 py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg shadow-md cursor-pointer transition-none"
              >
                Sign up
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex justify-center mt-8">
          <p className="text-primary/70 font-medium">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="hover:text-blue-600 font-semibold transition-colors duration-300"
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
