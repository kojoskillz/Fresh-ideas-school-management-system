"use client";

import { useState } from "react";
import { Path, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, Loader } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadImage } from "@/hooks/use-user";
import {
  uploadImageSchema,
  UploadFormValues,
  TeacherFormValues,
  StudentFormValues,
} from "@/lib/schemas/userSchema";
import { User } from "@/types/user";

interface ProfileUploaderProps<
  T extends TeacherFormValues | StudentFormValues
> {
  user?: User;
  form?: UseFormReturn<T>;
}

export default function ProfileUploader<
  T extends TeacherFormValues | StudentFormValues
>({ user, form }: ProfileUploaderProps<T>) {
  const [preview, setPreview] = useState<string | null>(
    (user as User)?.img_url
  );

  const uploadForm = useForm<UploadFormValues>({
    resolver: zodResolver(uploadImageSchema),
    mode: "onChange",
    defaultValues: { user_id: (user as User)?._id },
  });

  const uploadMutation = useUploadImage(uploadForm);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleUploadImage = async (formData: UploadFormValues) => {
    try {
      const resp = await uploadMutation.mutateAsync({
        ...formData,
        user_id: (user as User)?._id,
      });

      const data = resp?.data?.data;

      if (!data) return;

      if ("url" in data && form) {
        form.setValue("photo" as Path<T>, data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-md bg-white flex flex-col items-center mb-3">
      <Avatar className="w-20 h-20 relative">
        {uploadMutation.isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <Loader className="w-6 h-6 animate-spin text-white" />
          </div>
        )}

        <AvatarImage
          src={preview ?? ""}
          className="w-full h-full object-cover"
        />
        <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <Form {...uploadForm}>
        <form
          onSubmit={uploadForm.handleSubmit(handleUploadImage)}
          className="flex flex-col items-center gap-4 mt-4"
        >
          <FormField
            control={uploadForm.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="border-none max-w-[200px] mx-auto shadow-none"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      field.onChange(file);
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      setTimeout(() => URL.revokeObjectURL(previewUrl), 3000);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={uploadMutation.isPending || !uploadForm.formState.isValid}
            type="submit"
            variant="flat"
            size="lg"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
