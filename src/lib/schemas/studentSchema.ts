import { z } from "zod";
import { validatePhone } from "@/lib/utils";

const genderEnum = z.enum(["MALE", "FEMALE"]);
const religionEnum = z.enum(["CHRISTIAN", "MUSLIM", "TRADITIONIST"]);

export const studentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
  password: z.string().min(8),
  class: z.string(),
  date_of_birth: z.string(),
  gender: genderEnum,
  address: z.string(),
  mother: z.string(),
  mother_phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
  father: z.string(),
  father_phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
  religion: religionEnum,
  photo: z.string().optional(),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
