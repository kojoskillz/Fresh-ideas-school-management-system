import { z } from "zod";
import { validatePhone } from "../utils";

const genderEnum = z.enum(["MALE", "FEMALE"]);
const religionEnum = z.enum(["CHRISTIAN", "MUSLIM", "TRADITIONIST"]);

export const teacherSchema = z.object({
  name: z.string().min(1, "Teacher full name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required").refine(validatePhone, {
    message: "Invalid phone number",
  }),
  password: z.string().min(8, "Password should be minimum of 8 characters"),
  assigned_class: z.string().nonempty("assign class to teacher"),
  date_of_birth: z.string(),
  gender: genderEnum,
  address: z.string().min(10, "Enter a valid address"),
  next_of_kin: z.string().min(1, "Next of kin name is required"),
  next_of_kin_phone: z
    .string()
    .min(1, "Next of kin phone number is required")
    .refine(validatePhone, {
      message: "Invalid phone number",
    }),
  religion: religionEnum,
  photo: z.string().optional(),
});

export type TeacherFormValues = z.infer<typeof teacherSchema>;
