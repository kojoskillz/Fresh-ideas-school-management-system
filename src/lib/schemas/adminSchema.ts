import { z } from "zod";
import { userSchema } from "./userSchema";
import { UserRole } from "@/types/user";

export const scoresSchema = z.object({
  project: z
    .number({
      invalid_type_error: "Enter project's score",
    })
    .min(0, { message: "Projects score cannot be less than 0" })
    .max(20, { message: "Projects score cannot exceed 20" }),

  note: z
    .number({
      invalid_type_error: "Enter note's score",
    })
    .min(0, { message: "Note score cannot be less than 0" })
    .max(10, { message: "Note score cannot exceed 10" }),

  home_work: z
    .number({
      invalid_type_error: "Enter home work score",
    })
    .min(0, { message: "Homework score cannot be less than 0" })
    .max(10, { message: "Homework score cannot exceed 10" }),

  ca: z
    .number({
      invalid_type_error: "Enter ca score",
    })
    .min(0, { message: "CA score cannot be less than 0" })
    .max(10, { message: "CA score cannot exceed 10" }),

  exam: z
    .number({
      invalid_type_error: "Enter exam score",
    })
    .min(0, { message: "Exam score cannot be less than 0" })
    .max(40, { message: "Exam score cannot exceed 40" }),
});

export const resultCommentSchema = z
  .object({
    comment: z.string().nonempty("Enter comment"),
    opened_days: z.coerce.number().min(1, "Enter time school opened"),
    present_days: z.coerce.number().min(1, "Enter time presents"),
    term: z.string().nonempty("Select a term..."),
    cls: z.object({
      key: z.string().nonempty(),
      name: z.string().nonempty(),
    }),
    student: z.object({
      _id: z.string(),
      user: z.object({
        name: z.string(),
      }),
    }),
    session: z.string().nonempty("Select a session..."),
  })
  .refine((data) => data.present_days <= data.opened_days, {
    path: ["present_days"],
    message: "Present days cannot be more than opened days",
  });

export const resultSchema = z.object({
  results: z.array(
    z.object({
      student: z.object({
        _id: z.string(),
        user: z.object({
          name: z.string(),
        }),
      }),
      session: z.string(),
      term: z.string(),
      subject: z.object({ _id: z.string(), name: z.string() }),
      class: z.object({ name: z.string(), key: z.string() }),
      scores: scoresSchema,
    })
  ),
});

export const subjectSchema = z
  .object({
    subjects: z.array(z.string().min(1, "Subject name is required")),
  })
  .refine(
    (data) =>
      new Set(data.subjects.map((s) => s.toLowerCase())).size ===
      data.subjects.length
  );




export type ScoreValue = z.infer<typeof scoresSchema>;
export type ResultFormValue = z.infer<typeof resultSchema>;
export type ResultCommentFormValue = z.infer<typeof resultCommentSchema>;

export type SubjectFormValues = z.infer<typeof subjectSchema>;
