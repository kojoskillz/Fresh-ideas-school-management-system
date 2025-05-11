"use client";

import AdminLayout from "@/components/layouts/admin";
import {
  Form,
  FormDescription,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
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
import { Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const form = useForm();
  return (
    <AdminLayout page="Add Student" header="Student's profile">
      <div className="grid grid-cols-3 gap-4 p-4 items-start ">
        <div className="col-span-1 bg-white pt-10 rounded-md pb-5 px-4">
          <div className="flex  flex-col items-center gap-4">
            <Avatar className="w-[128px] h-[128px]">
              <AvatarImage className="w-full h-full" />
              <AvatarFallback
                className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium text-violet11 bg-primary-foreground"
                delayMs={600}
              >
                MF
              </AvatarFallback>
            </Avatar>
            <Form {...form}>
              <form className="flex flex-col items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="file" className="border-none" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#E11B71] text-white px-10 font-medium"
                >
                  Upload
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4">
            <h4 className="text-center font-semibold mb-4">
              Student&apos;s Name
            </h4>
            <ol className="space-y-2">
              <li>
                <strong>Email:</strong>
                <span className="text-primary/70">Null</span>
              </li>
              <li>
                <strong>Phone number:</strong>
                <span className="text-primary/70">Null</span>
              </li>
              <li>
                <strong>Password:</strong>
                <span className="text-primary/70">Null</span>
              </li>
              <li>
                <strong>Gender:</strong>
                <span className="text-primary/70">Null</span>
              </li>
              <li>
                <strong>Address:</strong>
                <span className="text-primary/70">Null</span>
              </li>
            </ol>
          </div>
        </div>
        <div className="col-span-2 bg-white pt-10 rounded-md">
          <div className="text-center flex justify-center mb-8">
            <h5 className=" bg-secondary w-full text-white max-w-[400px] px-4 py-2 rounded-xl font-medium">
              Add a Student
            </h5>
          </div>
          <div className="p-4 pb-5">
            <Form {...form}>
              <FormDescription>PERSONAL INFORMATION</FormDescription>
              <form className="space-y-8 mt-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary/70">
                        Student&apos;s name
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

                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="date_of_birth"
                    render={({ field }) => (
                      <FormItem className="w-full lg:max-w-[200px]">
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
                            <SelectTrigger className="w-[180px] border-0 bg-primary-foreground rounded-sm">
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
                </div>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="mobile_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Mobile No
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter mobile number"
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
                </div>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="mobile_number"
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
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="admission_number"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">
                          Admission number
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter admission number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="w-full md:pr-2">
                      <FormLabel className="text-primary/70">Address</FormLabel>
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

                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="father_name"
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="father_number"
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
                </div>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="mother_name"
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
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mother_number"
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
                </div>
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-primary/70">Class</FormLabel>
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
                  <Button className="bg-secondary">
                    <Save />
                    Save
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
