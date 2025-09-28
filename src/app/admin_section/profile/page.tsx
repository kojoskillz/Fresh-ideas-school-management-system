"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
import React from "react";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const form = useForm();
  const { user } = useAuth();

  console.log(user);

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
                  name="name"
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
                  <span className="text-primary/55">0000</span>
                </li>

                <li className="flex gap-2">
                  <span className="font-semibold">Position:</span>
                  <span className="text-primary/55">Junior sectional head</span>
                </li>

                <li className="flex gap-2">
                  <span className="font-semibold">Category:</span>
                  <span className="text-primary/55">Day</span>
                </li>

                <div className="flex gap-2">
                  <span className="font-semibold">Address:</span>
                  <span className="text-primary/55">
                    13, Johnson Street, Yaba, Lagos
                  </span>
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
                  value="settings"
                  className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-secondary/10"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <div>
                  <div className="mt-5">
                    <h3 className="mb-5">Personal Profile</h3>
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
                          <p className="font-bold">{user?.name}</p>
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
                        <div>
                          <p className="font-semibold">Date of Birth:</p>
                          <p className="text-primary/55">
                            {user?.date_of_birth}
                          </p>
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
                        <div>
                          <p className="font-semibold">Phone number:</p>
                          <p className="text-primary/55">+233541833813</p>
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Gender:</p>
                          <p className="text-primary/55">Female</p>
                        </div>
                      </li>
                    </ol>
                    <ol className="space-y-4 relative">
                      <div className="hidden md:block bg-primary/30 absolute top-2 left-1.5 bottom-4 w-[1px]" />
                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Religion:</p>
                          <p className="text-primary/55">Christian</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Password:</p>
                          <p className="text-primary/55">********</p>
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">Next of kin:</p>
                          <p className="text-primary/55">Marvelous Becker</p>
                        </div>
                      </li>

                      <li className="flex gap-4">
                        <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
                        <div>
                          <p className="font-semibold">
                            Next of kin phone number:
                          </p>
                          <p className="text-primary/55">Marvelous Becker</p>
                        </div>
                      </li>
                    </ol>
                    <div className="bg-primary/30 absolute top-2 left-1.5 bottom-6 w-[1px] z-0 md:hidden" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <Form {...form}>
                  <FormDescription>
                    <div className="mt-5">
                      <h3 className="mb-8">Personal Profile</h3>
                      <p className="text-sm">
                        Below is the personal profile of information of the
                        student.All you need to know about the students
                        (address,phone number,parents name etc)
                      </p>
                    </div>
                  </FormDescription>
                  <form className="mt-5">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel className="text-primary/70">
                              Gender
                            </FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="light">MALE</SelectItem>
                                  <SelectItem value="dark">FEMALE</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone_number"
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
                              <Select {...field}>
                                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                                  <SelectValue placeholder="Select religion" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="christian">
                                    Christian
                                  </SelectItem>
                                  <SelectItem value="muslim">Muslim</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
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
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="next_of_kin_number"
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
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="class"
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
                                placeholder="Enter class"
                              />
                            </FormControl>
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
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button variant="secondary">
                        <Save />
                        Save
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
