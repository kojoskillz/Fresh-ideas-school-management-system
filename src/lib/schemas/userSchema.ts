import { z } from "zod";
import { validatePhone } from "../utils";
import { UserGender, UserReligion, UserRole } from "@/types/user";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
  password: z.string().min(8, "Enter a solid password"),
  date_of_birth: z.string(),
  gender: z
    .nativeEnum(UserGender)
    .refine((val) => !val || Object.values(UserGender).includes(val), {
      message: "Select a gender",
    }),
  address: z.string(),
  religion: z.nativeEnum(UserReligion),
  photo: z.string().optional(),
});

export const adminSchema = userSchema.extend({
  role: z.literal(UserRole.ADMIN),
  next_of_kin: z.string().min(1, "Next of kin is required"),
  next_of_kin_phone: z.string().min(7, "Next of kin phone is required"),
  position: z.string().nonempty("Position is required"),
});

export const teacherSchema = userSchema.extend({
  role: z.literal(UserRole.TEACHER),
  class_key: z.string().nonempty("assign class to teacher").optional(),
  next_of_kin: z.string().min(1, "Next of kin name is required"),
  next_of_kin_phone: z
    .string()
    .min(1, "Next of kin phone number is required")
    .refine(validatePhone, {
      message: "Invalid phone number",
    }),
});

export const studentSchema = userSchema.extend({
  role: z.literal(UserRole.STUDENT),
  class_key: z.string(),
  mother: z.string(),
  mother_phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
  father: z.string(),
  father_phone: z.string().refine(validatePhone, {
    message: "Invalid phone number",
  }),
});

export const uploadImageSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, {
      message: "Please select a file",
    })
    .refine((file) => file instanceof File && file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file instanceof File && file.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    }),
  user_id: z.string().optional(),
});

export const createUserProfileSchema = z.discriminatedUnion("role", [
  teacherSchema,
  studentSchema,
  adminSchema,
]);

export const userEditProfile = z.discriminatedUnion("role", [
  adminSchema
    .omit({ password: true })
    .extend({ role: z.literal(UserRole.ADMIN) }),
  studentSchema
    .omit({ password: true })
    .extend({ role: z.literal(UserRole.STUDENT) }),
  teacherSchema
    .omit({ password: true })
    .extend({ role: z.literal(UserRole.TEACHER) }),
]);

export type createuserProfileFormValues = z.infer<
  typeof createUserProfileSchema
>;
export type AdminFormValue = z.infer<typeof adminSchema>;
export type TeacherFormValues = z.infer<typeof teacherSchema>;
export type UserEditProfileFormValues = z.infer<typeof userEditProfile>;
export type StudentFormValues = z.infer<typeof studentSchema>;
export type UploadFormValues = z.infer<typeof uploadImageSchema>;
