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
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Zod Schema: Relaxed Validation for Mock Login ---
// Allows any non-empty string for email and password for easy testing.
// In a real application, you'd have stricter validations here.
const loginSchema = z.object({
  email: z.string().min(1, "Email or phone is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// changes will be made here
const MOCK_USERS_FOR_ROLES = [
  { email: "admin", role: "admin" },
  { email: "teacher", role: "teacher" },
  { email: "student", role: "student" },
  // Add more mock users and their roles as needed for testing
];
// -----------------------------------------------------------------

function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Manages loading state for the button
  const [error, setError] = useState<string | null>(null); // Stores and displays login error messages

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handles form submission, simulates login, and redirects based on mock user role
  const handleSubmitHandler = async (data: LoginFormValues) => {
    setIsLoading(true); // Start loading animation
    setError(null); // Clear any previous error messages

    // Simulate a network request delay for better UX during development
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find if the entered email matches any of our mock user roles (case-insensitive)
    const mockUser = MOCK_USERS_FOR_ROLES.find(
      (user) => user.email === data.email.toLowerCase()
    );

    if (mockUser) {
      // If a mock user is found, simulate a successful login
      console.log("Mock Login successful. User Role:", mockUser.role);

      // Store the mock user's role in local storage for subsequent page checks
      localStorage.setItem('userRole', mockUser.role);
      // A simple flag to indicate a user is "logged in" for basic route protection
      localStorage.setItem('loggedIn', 'true');

      // Redirect the user to the appropriate dashboard based on their mock role
      switch (mockUser.role) {
        case 'admin':
          router.push("/admin_section/dashboard");
          break;
        case 'student':
          router.push("/student_section/dashboard");
          break;
        case 'teacher':
          router.push("/teachers_section/dashboard");
          break;
        default:
          // Fallback for any roles not explicitly handled
          console.warn("Unknown mock role encountered. Redirecting to a default dashboard.");
          router.push("/default_dashboard");
          break;
      }
    } else {
      // If no mock user found for the entered email, display an error
      setError('No mock user found for this email. Try "admin", "teacher", or "student".');
      console.error("Mock login failed: Email not recognized in mock users.");
    }

    setIsLoading(false); // End loading animation
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-blue-100 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-extrabold text-center text-primary mb-2">
          Welcome
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Enter any password. Email should be 'admin', 'teacher', or 'student'.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitHandler)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-primary">Email (e.g., admin, teacher, student)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., admin"
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
                  <FormLabel className="text-sm font-medium text-primary">Password (can be anything)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="anything"
                      className="bg-gray-50 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 text-base transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Displays error message if login fails */}
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <Button
              type="submit"
              className="w-full py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
              disabled={isLoading} // Button is disabled while login is in progress
            >
              {isLoading ? "Signing In..." : "Sign In"} {/* Button text changes based on loading state */}
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
