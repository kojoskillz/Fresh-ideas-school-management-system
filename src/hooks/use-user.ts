import { useMutation } from "@tanstack/react-query";
import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import {
  UploadFormValues,
  UserEditProfileFormValues,
} from "@/lib/schemas/userSchema";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";

export function useUploadImage<T extends FieldValues = FieldValues>(
  form?: UseFormReturn<T>
) {
  return useMutation({
    mutationFn: async (values: UploadFormValues) => {
      const formData = new FormData();
      formData.append("file", values.file);
      return await axios.post(apis.user.upload, formData);
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

export function useEditProfile() {
  return useMutation({
    mutationFn: async ({
      formData,
      userId,
    }: {
      formData: UserEditProfileFormValues;
      userId: string;
    }) => {
      return (
        await axios.put(`${apis.user.edit_profile}/${userId}`, {
          ...formData,
        })
      ).data.data;
    },
    onError: (err) => {
      handleApiError(err, {
        title: "Edit profile error",
        description: "Error occur while editing user profile",
      });
    },
    onSuccess: (resp) => {
      console.log(resp)
      toast.success("Profile successfully updated", {
        description: "Profile was updated successfully",
      });
    },
  });
}
