import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import {
  ResultCommentFormValue,
  ResultFormValue,
} from "@/lib/schemas/adminSchema";
import { StudentFormValues } from "@/lib/schemas/studentSchema";
import { TeacherFormValues } from "@/lib/schemas/teacherSchema";
import { handleApiError } from "@/lib/utils";
import { StudentProfile } from "@/types/student";
import { QueryType } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
export function useAddResult<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>
) {
  return useMutation({
    mutationFn: (formData: ResultFormValue) => {
      const updatedFormData = formData.results.map((item) => ({
        ...item,
        student: item.student._id,
        class_key: item.class.key,
        subject: item.subject._id,
        scores: { ...item.scores },
      }));
      return axios.post(apis.admin.add_results, updatedFormData);
    },

    onSuccess: () => {
      form.reset();

      toast.success("Results added successfully", {
        description: "New students result was successfully added!",
      });
    },
    onError: (err) => {
      handleApiError(err, {
        title: "Error adding student result",
        description: "An error occured while trying to add student result",
      });
    },
  });
}

export function useGetAllTeachers(query: Partial<QueryType>) {
  const { page, cls, limit } = query;
  const { search } = useAuth();
  return useQuery({
    queryKey: ["admin-all-teachers", { page, search, cls, limit }],
    queryFn: async () => {
      return (
        await axios.get(apis.admin.all_teachers, {
          params: { page, search, class_key: cls?.key, limit },
        })
      ).data.data;
    },
  });
}

export function useGetAllStudents(query: Partial<QueryType>) {
  const { page, cls, limit } = query;
  const { search } = useAuth();

  return useQuery({
    queryKey: ["admin-all-students", { page, search, cls, limit }],
    queryFn: async () => {
      return (
        await axios.get(apis.admin.all_students, {
          params: { page, limit, search, class_key: cls?.key },
        })
      ).data.data;
    },
  });
}

export function useGetAllSubject() {
  return useQuery({
    queryKey: ["all-subject"],
    queryFn: async () => {
      return (await axios.get(apis.admin.subjects)).data.data;
    },
  });
}
export function useGetResults(params: Partial<QueryType>) {
  const { term, student, cls, session } = params;
  console.log({ term, student, cls, session })
  return useQuery({
    queryKey: ["all-results", params],
    queryFn: async () => {
      return (
        await axios.get(apis.admin.student_result, {
          params: {
            term,
            class_key: cls?.key,
            student_id: student?._id,
            session,
          },
        })
      ).data.data;
    },
    enabled: Boolean(term && student?._id && cls?.key && session),
  });
}

export function useGetExtraResults(query: Partial<QueryType>) {
  const { page, limit, term, session } = query;
  const { search } = useAuth();
  return useQuery({
    queryKey: ["quick-class-result", { page, search, limit, term, session }],
    queryFn: async () => {
      console.log(term);
      return (
        await axios.get(apis.admin.quick_results, {
          params: { page, search, term, limit, session },
        })
      ).data.data;
    },
    enabled: Boolean(term && session),
  });
}

export function useAddResultComment<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formValue: ResultCommentFormValue) => {
      const { student, class: cls, ...formData } = formValue;

      return (
        await axios.post(apis.admin.add_result_comment, {
          ...formData,
          class_key: cls.key,
          student_id: student._id,
        })
      ).data.data;
    },

    onSuccess: () => {
      form.reset();
      toast.success("Comment inserted successfully", {
        description:
          "New comment inserted to students result was successfully added!",
      });

      queryClient.invalidateQueries({ queryKey: ["all-results"] });
    },

    onError: (err) => {
      handleApiError(err, {
        title: "Error adding student result comment",
        description:
          "An error occured while trying to add student result comment",
      });
    },
  });
}
