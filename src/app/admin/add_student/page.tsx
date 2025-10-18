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
import { Loader, Save } from "lucide-react";
import { usePersistedForm } from "@/hooks/use-persisted-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentFormValues, studentSchema } from "@/lib/schemas/userSchema";
import { useAddStudent } from "@/hooks/use-admin";
import { classes } from "@/lib/school_classes";
import ProfileUploader from "@/components/shared/profileUploader";
import { UserRole } from "@/types/user";
import { useEffect } from "react";

export default function Page() {
  const form = usePersistedForm("admin-student-form", {
    resolver: zodResolver(studentSchema),
    defaultValues: {
      role: UserRole.STUDENT,
      name: "",
      email: "",
      date_of_birth: "",
      gender: undefined,
      phone: "",
      address: "",
      father: "",
      mother: "",
      father_phone: "",
      mother_phone: "",
      religion: undefined,
      photo: "",
    },
  });

  const addStudentMutation = useAddStudent(form);

  const formData = form.watch();

  const handleSubmitHandler = (formValue: StudentFormValues) =>
    addStudentMutation.mutate(formValue);

  useEffect(() => {
    form.setValue("role", UserRole.STUDENT);
  }, []);

  return (
    <AdminLayout page="Add Student">
      <div className="grid grid-cols-3 gap-4 p-4 items-start ">
        <div className="col-span-1 bg-white pt-10 rounded-md pb-5 px-4">
          <div className="flex  flex-col items-center gap-4">
            <ProfileUploader form={form} />
          </div>
          <div className="mt-4">
            <h4 className="text-center font-semibold mb-4">
              {formData.name ?? " Student's Name"}
            </h4>

            <ol className="space-y-2">
              <li className="flex gap-1">
                <strong>Email: </strong>
                <span className="text-primary/70">
                  {formData.email || " Not provided"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Phone number:</strong>
                <span className="text-primary/70">
                  {formData.phone || " Not provided"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Password:</strong>
                <span className="text-primary/70">
                  {" "}
                  {formData.password || " Not provided"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Gender:</strong>
                <span className="text-primary/70">
                  {" "}
                  {formData.gender || " Not provided"}
                </span>
              </li>
              <li className="flex gap-1">
                <strong>Address:</strong>
                <span className="text-primary/70">
                  {" "}
                  {formData.address || " Not provided"}
                </span>
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
              <form
                onSubmit={form.handleSubmit(handleSubmitHandler)}
                className="space-y-8 mt-5"
              >
                <div className="grid lg:grid-cols-2 gap-6">
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary/70">
                          Student&apos;s email
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
                                CHRISTIAN
                              </SelectItem>
                              <SelectItem value="MUSLIM">MUSLIM</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
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
                            placeholder="Enter phone number"
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="w-full md:pr-2 lg:col-span-2">
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
                            placeholder="Enter father name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="father_phone"
                    render={({ field }) => (
                      <FormItem className="w-full ">
                        <FormLabel className="text-primary/70">
                          Father&apos;s phone No
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="border-0 bg-primary-foreground rounded-sm"
                            placeholder="Enter father phone number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
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
                            placeholder="Enter mother name"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
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
                            placeholder="Enter mother phone number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
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
                              <SelectValue placeholder="Select class" />
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
                  <Button
                    disabled={addStudentMutation.isPending}
                    variant="secondary"
                  >
                    {addStudentMutation.isPending ? (
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
