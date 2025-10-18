import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import {
  ResultCommentFormValue,
  ResultFormValue,
} from "@/lib/schemas/adminSchema";
import { handleApiError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { QueryType } from "@/types/user";
import { useAuth } from "./use-auth";

export function useAddResultComment<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formValue: ResultCommentFormValue) => {
      const { student, cls, ...formData } = formValue;

      return (
        await axios.post(apis.result.add_result_comment, {
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
      return axios.post(apis.result.add_results, updatedFormData);
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

export function useGetResults(params: Partial<QueryType>) {
  const { term, student, cls, session } = params;

  return useQuery({
    queryKey: ["all-results", params],
    queryFn: async () => {
      return (
        await axios.get(apis.result.results, {
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
  const { page, limit, term, session, cls } = query;
  const { search } = useAuth();

  return useQuery({
    queryKey: ["quick-class-result", page, search, limit, term, session, cls],
    queryFn: async () => {
      return (
        await axios.get(apis.result.quick_results, {
          params: { page, search, term, limit, session, class_key: cls?.key },
        })
      ).data.data;
    },
    enabled: Boolean(term && session && cls?.key),
  });
}
