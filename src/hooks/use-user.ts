import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: UploadFormValues) => {
      const formData = new FormData();
      formData.append("file", values.file);

      if (values.user_id) {
        formData.append("user_id", values.user_id);
      }
      return await axios.post(apis.user.upload, formData);
    },
    onSuccess: (res) => {
      if (form) {
        form.setValue("photo" as any, res.data?.data?.url);
      }
      toast.success("Upload success", {
        description: "Image uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["Authenticated User"] });
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
  const queryClient = useQueryClient();
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

    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: ["Authenticated User"] });
      console.error(resp);
      toast.success("Profile successfully updated", {
        description: "Profile was updated successfully",
      });
    },
    onError: (err) => {
      handleApiError(err, {
        title: "Edit profile error",
        description: "Error occur while editing user profile",
      });
    },
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => {
      return (await axios.get("/users/dashboard")).data.data;
    },
  });
}
