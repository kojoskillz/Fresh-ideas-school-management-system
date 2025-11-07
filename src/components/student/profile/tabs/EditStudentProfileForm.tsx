"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserGender, UserReligion, UserRole } from "@/types/user";
import {
  userEditProfile,
  UserEditProfileFormValues,
} from "@/lib/schemas/userSchema";
import { useEditProfile } from "@/hooks/use-user";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { classes } from "@/lib/school_classes";
import { StudentProfile } from "@/types/student";

export default function EditProfileForm({ user }: { user: User }) {
  const editForm = useForm<UserEditProfileFormValues>({
    resolver: zodResolver(userEditProfile),
    defaultValues: {
      role: UserRole.STUDENT,
      name: user?.name,
      email: user?.email,
      date_of_birth: user?.date_of_birth,
      gender: user?.gender as UserGender,
      religion: user?.religion as UserReligion,
      phone: user?.phone,
      father: (user?.profile as StudentProfile)?.father,
      father_phone: (user?.profile as StudentProfile)?.father_phone,
      mother: (user?.profile as StudentProfile)?.mother,
      mother_phone: (user?.profile as StudentProfile)?.mother_phone,
      class_key: (user?.profile as StudentProfile)?.class.key,
    },
  });

  const editMutation = useEditProfile();

  const handleEditUserSubmit = (formData: UserEditProfileFormValues) => {
    console.log(formData);
    editMutation.mutate({
      formData: formData,
      userId: user?._id as string,
    });
  };

  useEffect(() => {
    if (!user) return;

    editForm.reset({
      role: UserRole.STUDENT,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      date_of_birth: user?.date_of_birth,
      gender: (user?.gender as UserGender) || "",
      religion: (user?.religion as UserReligion) || "",
      phone: user?.phone || "",
      father: (user?.profile as StudentProfile)?.father || "",
      father_phone: (user?.profile as StudentProfile)?.father_phone || "",
      mother: (user?.profile as StudentProfile)?.mother || "",
      mother_phone: (user?.profile as StudentProfile)?.mother_phone || "",
      class_key: (user?.profile as StudentProfile)?.class.key || "",
    });
  }, [user]);

  return (
    <Form {...editForm}>
      <form
        className="mt-5"
        onSubmit={editForm.handleSubmit(handleEditUserSubmit)}
      >
        <h3 className="mb-8">Personal Profile</h3>
        <FormDescription className="mb-5">
          Below is the personal profile of information of the student.All you
          need to know about the students (address,phone number,parents name
          etc)
        </FormDescription>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <FormField
            control={editForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">
                  Admin&apos;s name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border-0 bg-primary-foreground rounded-sm"
                    placeholder="Enter Admin name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="class_key"
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
            control={editForm.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">Date of Birth</FormLabel>
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
            control={editForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-primary/70">Gender</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">Phone No</FormLabel>
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
            control={editForm.control}
            name="religion"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">Religion</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CHRISTIAN">Christian</SelectItem>
                      <SelectItem value="MUSLIM">Muslim</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={editForm.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full col-span-2">
                <FormLabel className="text-primary/70">Address</FormLabel>
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
            control={editForm.control}
            name="father"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">
                  Father&apos;s name
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
            control={editForm.control}
            name="father_phone"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-primary/70">
                  Father&apos;s Phone No
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
            control={editForm.control}
            name="mother"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary/70">
                  Mother&apos;s name
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
            control={editForm.control}
            name="mother_phone"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="text-primary/70">
                  Mother&apos;s Phone No
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
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="secondary">
            {editMutation.isPending ? (
              <>
                <Loader className="animate-spin" />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save />
                <span>Update</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
