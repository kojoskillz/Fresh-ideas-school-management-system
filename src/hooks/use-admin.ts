import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { SubjectFormValues } from "@/lib/schemas/adminSchema";
import { StudentFormValues, TeacherFormValues } from "@/lib/schemas/userSchema";
import { handleApiError } from "@/lib/utils";
import { QueryType } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "./use-auth";

export function useAddTeacher<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T> & { resetPersisted: () => void }
) {
  return useMutation({
    mutationFn: (formData: TeacherFormValues) => {
      return axios.post(apis.admin.add_teacher, formData);
    },

    onSuccess: () => {
      form.resetPersisted();
      toast.success("New teacher added successfully", {
        description: "A new teacher was successfully added!",
      });
    },

    onError: (err) => {
      handleApiError(err, {
        title: "Error adding teacher",
        description: "An error occured while trying to add teacher",
      });
    },
  });
}

export function useAddStudent<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T> & { resetPersisted: () => void }
) {
  return useMutation({
    mutationFn: (formData: StudentFormValues) => {
      return axios.post(apis.admin.add_student, formData);
    },

    onSuccess: () => {
      form.resetPersisted();
      toast.success("New student added successfully", {
        description: "A new student was successfully added!",
      });
    },

    onError: (err) => {
      handleApiError(err, {
        title: "Error adding student",
        description: "An error occured while trying to add student",
      });
    },
  });
}

export function useAddSubjects<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>
) {
  return useMutation({
    mutationFn: async (formData: SubjectFormValues) => {
      return (await axios.post(apis.admin.add_subject, formData.subjects)).data
        .data;
    },

    onError: (err) =>
      handleApiError(err, {
        title: "Error adding subject",
        description: "An error occured while trying to add subject",
      }),

    onSuccess: () => {
      form.reset();
      toast.success("Subjects added successfully", {
        description: "New subjects was successfully added!",
      });
    },
  });
}


