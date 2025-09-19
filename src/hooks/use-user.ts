import { useMutation } from "@tanstack/react-query";
import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { UploadFormValues } from "@/lib/schemas/userSchema";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";

export function useUploadImage<T extends FieldValues = FieldValues>(
  form?: UseFormReturn<T>
) {
  return useMutation({
    mutationFn: (values: UploadFormValues) => {
      const formData = new FormData();
      formData.append("file", values.file);
      return axios.post(apis.user.upload, formData);
    },
    onSuccess: (res) => {
      if (form) {
        form.setValue("photo" as any, res.data?.data?.url);
      }
      toast.success("Upload success", {
        description: "Image uploaded successfully",
      });
    },
    onError: (err) => {
      handleApiError(err, {
        title: "Upload error",
        description: "Error occur while uploading image",
      });
    },
  });
}
