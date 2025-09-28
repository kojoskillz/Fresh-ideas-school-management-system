import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { StudentFormValues } from "@/lib/schemas/studentSchema";
import { TeacherFormValues } from "@/lib/schemas/teacherSchema";
import { handleApiError } from "@/lib/utils";
import { lime } from "@mui/material/colors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

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

export function useGetAllTeachers(query: {
  page: number;
  limit: number;
  search: string;
}) {
  return useQuery({
    queryKey: ["admin-all-teachers", query],
    queryFn: async () => {
      return (
        await axios.get(apis.admin.all_teachers, {
          params: query,
        })
      ).data.data;
    },
  });
}

export function useGetAllStudents(query: {
  page: number;
  limit: number;
  search: string;
}) {
  return useQuery({
    queryKey: ["admin-all-students", query],
    queryFn: async () => {
      return (
        await axios.get(apis.admin.all_students, {
          params: query,
        })
      ).data.data;
    },
  });
}
