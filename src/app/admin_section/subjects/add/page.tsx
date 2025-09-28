"use client";
import AdminLayout from "@/components/layouts/admin";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";

function Page() {
  const form = useForm();

  return (
    <AdminLayout page="Add Subject">
      <div className="p-4">
        <div className="bg-white pt-10 rounded-md">
          <div className="text-center flex justify-center mb-8">
            <h5 className=" bg-secondary w-full text-white max-w-[400px] px-4 py-2 rounded-xl font-medium">
              Add a Student
            </h5>
          </div>
          <Form {...form}>
            <form className="p-5">
              <div className="space-y-4 mb-8 max-w-[600px]">
                {[
                  "sub_one",
                  "sub_two",
                  "sub_three",
                  "sub_four",
                  "sub_five",
                  "sub_six",
                ].map((field, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={field}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-5">
                            <Input
                              {...field}
                              type="text"
                              placeholder="Subject"
                              className="border-0 bg-primary-foreground rounded-sm"
                            />
                            <Button
                              className="bg-green-500 rounded-sm px-10"
                              type="button"
                            >
                              Add
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="secondary">
                  <Save />
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Page;
