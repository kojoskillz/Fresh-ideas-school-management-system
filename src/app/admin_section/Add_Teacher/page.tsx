"use client";

import AdminLayout from "@/components/layouts/admin";
import {
  Form,
  FormDescription,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Save, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeacherFormValues, teacherSchema } from "@/lib/schemas/teacherSchema";
import { usePersistedForm } from "@/hooks/use-persisted-form";
import { classes } from "@/lib/class";
import { useAddTeacher } from "@/hooks/use-admin";
import { useUploadImage } from "@/hooks/use-user";
import { UploadFormValues, uploadImageSchema } from "@/lib/schemas/userSchema";
import { getInitial } from "@/lib/utils";

export default function Page() {
  const form = usePersistedForm<TeacherFormValues>("admin-teacher-form", {
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      email: "",
      name: "",
      date_of_birth: "",
      gender: undefined,
      address: "",
      password: "",
      phone: "",
      next_of_kin: "",
      next_of_kin_phone: "",
      assigned_class: "",
      religion: undefined,
      photo: "",
    },
  });

  const uploadForm = useForm<UploadFormValues>({
    resolver: zodResolver(uploadImageSchema),
    defaultValues: { file: undefined },
  });

  const uploadMutation = useUploadImage(form);
  const addTeacherMutation = useAddTeacher(form);

  const formData = form.watch();

  const handleSubmitHandler = (formValue: TeacherFormValues) =>
    addTeacherMutation.mutate(formValue);

  const handleUploadForm = (formValue: UploadFormValues) =>
    uploadMutation.mutate(formValue);

  const initials = getInitial(formData?.name);

  return (
    <AdminLayout page="Add Teacher">
      <div className="grid lg:grid-cols-3 gap-4 p-4 items-start ">
        <div className="col-span-1 bg-white pt-10 rounded-md pb-5 px-4">
          <div className="flex  flex-col items-center gap-4">
            <Avatar className="w-[128px] h-[128px]">
              {uploadMutation.isPending ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <Loader className="w-6 h-6 animate-spin text-white" />
                </div>
              ) : (
                <>
                  <AvatarImage
                    className="w-full h-full"
                    src={formData?.photo}
                  />
                  <AvatarFallback
                    className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium text-violet11 bg-primary-foreground"
                    delayMs={600}
                  >
                    {initials}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
            <Form {...uploadForm}>
              <form
                onSubmit={uploadForm.handleSubmit(handleUploadForm)}
                className="flex flex-col items-center gap-4"
              >
                <FormField
                  control={uploadForm.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          // {...field}
                          type="file"
                          className="border-none"
                          onChange={(e) => field.onChange(e.target.files?.[0])} // take first file
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="flat"
                  className=" text-white px-10 font-medium cursor-pointer !hover:opacity-80"
                  disabled={
                    uploadMutation.isPending || !uploadForm.formState.isValid
                  }
                >
                  {uploadMutation.isPending ? (
                    <>
                      <Loader />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload />
                      Upload
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4">
            <h4 className="text-center font-semibold mb-4">
              {formData.name ? formData.name : " Teacher's Name"}
            </h4>
            <ol className="space-y-2">
              <li className="flex gap-1">
                <strong>Email: </strong>
                <p className="text-primary/70 break-words min-w-0">
                  {formData.email ? formData.email : " Nill"}
                </p>
              </li>
              <li className="flex gap-1">
                <strong>Phone number:</strong>
                <span className="text-primary/70">
                  {formData.phone ? formData.phone : " Nill"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Password:</strong>
                <span className="text-primary/70">
                  {formData.password ? formData.password : " Nill"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Gender:</strong>
                <span className="text-primary/70 capitalize">
                  {formData.gender ? formData.gender.toLowerCase() : "Nill"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Address:</strong>
                <span className="text-primary/70">
                  {" "}
                  {formData.address ? formData.address : " Nill"}
                </span>
              </li>
            </ol>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white pt-10 rounded-md">
          <div className="text-center flex justify-center mb-8">
            <h5 className=" bg-secondary w-full text-white max-w-[300px] px-4 py-2 rounded-xl font-medium">
              Add a Teacher
            </h5>
          </div>
          <div className="p-4 pb-5">
            <Form {...form}>
              <FormDescription>PERSONAL INFORMATION</FormDescription>
              <form
                onSubmit={form.handleSubmit(handleSubmitHandler)}
                className="space-y-8 mt-5"
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Teacher&apos;s name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Teacher&apos;s email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter email address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Date of Birth
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter date of birth"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Gender
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MALE">MALE</SelectItem>
                              <SelectItem value="FEMALE">FEMALE</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Phone No
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter mobile number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Religion
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                              <SelectValue placeholder="Select religion" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CHRISTIAN">
                                Christian
                              </SelectItem>
                              <SelectItem value="MUSLIM">Muslim</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full lg:col-span-2">
                        <FormLabel className="text-primary/70">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className="border-0 bg-primary-foreground rounded-sm resize-none"
                            placeholder="Enter address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="next_of_kin"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Next of kin&apos;s name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter next of kin"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="next_of_kin_phone"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel className="text-primary/70">
                          Phone No
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter phone number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="assigned_class"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">Class</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                              <SelectValue placeholder="Assign class" />
                            </SelectTrigger>
                            <SelectContent>
                              {classes.map((classItem) => (
                                <SelectItem
                                  key={classItem.key}
                                  value={classItem.key}
                                  aria-label={`Select item ${classItem.name}`}
                                >
                                  {classItem.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel className="text-primary/70">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Set password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    disabled={
                      addTeacherMutation.isPending || !form.formState.isValid
                    }
                    variant="secondary"
                  >
                    {addTeacherMutation.isPending ? (
                      <>
                        <Loader />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
