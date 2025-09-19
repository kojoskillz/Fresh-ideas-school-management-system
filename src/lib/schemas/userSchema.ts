import { z } from "zod";

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
});

export type UploadFormValues = z.infer<typeof uploadImageSchema>;
