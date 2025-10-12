"use client";

import React, { useEffect } from "react";
import AdminLayout from "@/components/layouts/admin";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Save, UploadCloud, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { AdminProfile } from "@/types/admin";
import { UserGender, UserReligion, UserRole } from "@/types/user";
import {
  userEditProfile,
  UserEditProfileFormValues,
} from "@/lib/schemas/userSchema";
import { useEditProfile } from "@/hooks/use-user";
export default function Page() {
  const { user, isLoading } = useAuth();
  const form = useForm();

  useQueryClient().invalidateQueries({
    queryKey: ["Authenticated User"],
  });

  const editForm = useForm<UserEditProfileFormValues>({
    resolver: zodResolver(userEditProfile),
    defaultValues: {
      role: UserRole.ADMIN,
      name: user?.name,
      email: user?.email,
      date_of_birth: user?.date_of_birth,
      gender: user?.gender as UserGender,
      religion: user?.religion as UserReligion,
      phone: user?.phone,
      next_of_kin: (user?.profile as AdminProfile)?.next_of_kin,
      next_of_kin_phone: (user?.profile as AdminProfile)?.next_of_kin_phone,
      position: (user?.profile as AdminProfile)?.position,
    },
  });

  const editMutation = useEditProfile();

  const handleEditUserSubmit = (formData: UserEditProfileFormValues) => {
    editMutation.mutate({
      formData: formData,
      userId: user?._id as string,
    });
  };

  useEffect(() => {
    if (!user) return;

    editForm.reset({
      role: UserRole.ADMIN,
      name: user?.name,
      email: user?.email,
      address: user?.address,
      date_of_birth: user?.date_of_birth,
      gender: (user?.gender as UserGender) || "",
      religion: (user?.religion as UserReligion) || "",
      phone: user?.phone || "",
      next_of_kin: (user?.profile as AdminProfile)?.next_of_kin || "",
      next_of_kin_phone:
        (user?.profile as AdminProfile)?.next_of_kin_phone || "",
      position: (user?.profile as AdminProfile)?.position || "",
    });
  }, [user]);

  return (
    <AdminLayout page="Profile">
      <div className="p-5">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          {/* container1 */}
          <div className=" rounded-md bg-white flex flex-col items-center py-10 h-full">
            <Avatar className="w-20 h-20">
              <AvatarImage src={""} sizes="lg" />
              <AvatarFallback>UC</AvatarFallback>
            </Avatar>

            <Form {...form}>
              <form className="flex flex-col items-center gap-4">
                <FormField
                  control={form.control}
                  name="profile_img"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="file"
                          className="border-none max-w-[200px] mx-auto shadow-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="flat" size="lg">
                  <UploadCloud />
                  Upload
                </Button>
              </form>
            </Form>

            <div className="mt-6 px-4 w-full">
              <h1 className="text-center font-semibold">{user?.name}</h1>

              <ol className="mt-5 space-y-4 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold">Religion:</span>
                  {isLoading ? (
                    <Skeleton />
                  ) : !isLoading && user?.religion ? (
                    <p className="text-primary/55">{user?.religion}</p>
                  ) : (
                    <span className="text-primary/55">Not provided</span>
                  )}
                </li>

                <li className="flex gap-2">
                  <span className="font-semibold">Position:</span>
                  {isLoading ? (
                    <Skeleton />
                  ) : !isLoading &&
                    (user?.profile as AdminProfile)?.position ? (
                    <p className="text-primary/55">
                      {(user?.profile as AdminProfile)?.position}
                    </p>
                  ) : (
                    <span className="text-primary/55">Not provided</span>
                  )}
                </li>

                <li className="flex gap-2">
                  <span className="font-semibold">Category:</span>
                  <span className="text-primary/55">Day</span>
                </li>

                <div className="flex gap-2">
                  <span className="font-semibold">Address:</span>
                  {isLoading ? (
                    <Skeleton />
                  ) : !isLoading && user?.address ? (
                    <p className="text-primary/55">{user?.address}</p>
                  ) : (
                    <span className="text-primary/55">Not provided</span>
                  )}
                </div>
              </ol>
            </div>

            {/* forms (contains details of students to be uploaded) */}
          </div>

          {/* container2 */}
          <div className="rounded-md bg-white md:col-span-2 p-4 h-full">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className=" gap-4 w-full grid-cols-2 bg-transparent">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-secondary/10"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="edit"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-secondary/10"
                >
                  Edit Profile
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <div>
                  <div className="mt-5">
                    <p className="mb-5">Personal Profile</p>
                    <p className="text-sm">
                      Below is the personal profile of information of the
                      student.All you need to know about the students
                      (address,phone number,parents name etc)
                    </p>
                  </div>
                  {/* details of students */}
                  <div className="grid md:grid-cols-2 mt-7 gap-4 relative text-sm lg:text-base">
                    <ol className="space-y-4 relative">
                      <div className="hidden md:block bg-primary/30 absolute top-2 left-1.5 bottom-5 w-[1px]" />
                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold text-sm">Fullname:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading && user?.name ? (
                            <p className="text-primary/55">{user?.name}</p>
                          ) : (
                            <p className="text-primary/55">Not provided</p>
                          )}
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
                        <div>
                          <p className="font-semibold">Date of Birth:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading && user?.date_of_birth ? (
                            <p className="text-primary/55">
                              {user?.date_of_birth}
                            </p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
                        <div>
                          <p className="font-semibold">Phone number:</p>

                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading && user?.phone ? (
                            <p className="text-primary/55">{user?.phone}</p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Gender:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading && user?.gender ? (
                            <p className="text-primary/55">{user?.gender}</p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>
                    </ol>
                    <ol className="space-y-4 relative">
                      <div className="hidden md:block bg-primary/30 absolute top-2 left-1.5 bottom-4 w-[1px]" />
                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Religion:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading && user?.religion ? (
                            <p className="text-primary/55">{user?.religion}</p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Position:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading &&
                            (user?.profile as AdminProfile)?.position ? (
                            <p className="text-primary/55">
                              {(user?.profile as AdminProfile)?.position}
                            </p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Next of kin:</p>
                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading &&
                            (user?.profile as AdminProfile)?.next_of_kin ? (
                            <p className="text-primary/55">
                              {(user?.profile as AdminProfile)?.next_of_kin}
                            </p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">
                            Next of kin phone number:
                          </p>

                          {isLoading ? (
                            <Skeleton className="h-6 w-32" />
                          ) : !isLoading &&
                            (user?.profile as AdminProfile)
                              ?.next_of_kin_phone ? (
                            <p className="text-primary/55">
                              {
                                (user?.profile as AdminProfile)
                                  ?.next_of_kin_phone
                              }
                            </p>
                          ) : (
                            <span className="text-primary/55">
                              Not provided
                            </span>
                          )}
                        </div>
                      </li>
                    </ol>
                    <div className="bg-primary/30 absolute top-2 left-1.5 bottom-6 w-[1px] z-0 md:hidden" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit">
                <Form {...editForm}>
                  <form
                    className="mt-5"
                    onSubmit={editForm.handleSubmit(handleEditUserSubmit)}
                  >
                    <h3 className="mb-8">Personal Profile</h3>
                    <FormDescription className="mb-5">
                      Below is the personal profile of information of the
                      student.All you need to know about the students
                      (address,phone number,parents name etc)
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
                        name="position"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-primary/70">
                              Position
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                className="border-0 bg-primary-foreground rounded-sm"
                                placeholder="Enter admin position"
                              />
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
                        control={editForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-primary/70">
                              Gender
                            </FormLabel>
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
                        control={editForm.control}
                        name="religion"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="text-primary/70">
                              Religion
                            </FormLabel>
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
                        control={editForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="w-full col-span-2">
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
                        control={editForm.control}
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
                        control={editForm.control}
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
