import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValue = z.infer<typeof forgotPasswordSchema>;
