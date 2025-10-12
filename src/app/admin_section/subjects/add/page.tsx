"use client";

import AdminLayout from "@/components/layouts/admin";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Save, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubjectFormValues, subjectSchema } from "@/lib/schemas/adminSchema";
import { useAddSubjects } from "@/hooks/use-admin";

function Page() {
  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { subjects: [] },
  });
  
  const subjectMutution = useAddSubjects(form);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subjects" as never,
  });

  const handleSubmitHandler = (data: SubjectFormValues) =>
    subjectMutution.mutate(data);

  useEffect(() => {
    if (fields.length == 0) {
      append("");
    }
  }, [fields, append]);

  return (
    <AdminLayout page="Add Subject">
      <div className="p-4">
        <div className="bg-white pt-10 rounded-md">
          <div className="text-center flex justify-center mb-8">
            <h5 className=" bg-secondary w-full text-white max-w-[400px] px-4 py-2 rounded-xl font-medium">
              Add Subject
            </h5>
          </div>
          <Form {...form}>
            <form
              className="p-5"
              onSubmit={form.handleSubmit(handleSubmitHandler)}
            >
              <div className="space-y-4 mb-8 max-w-[600px]">
                {fields.map((subject, index) => {
                  return (
                    <FormField
                      key={subject.id}
                      control={form.control}
                      name={`subjects.${index}` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex gap-5">
                              <Input
                                {...field}
                                type="text"
                                placeholder={`Subject ${index + 1}`}
                                className="border-0 bg-primary-foreground rounded-sm"
                              />
                              {index === fields.length - 1 && (
                                <Button
                                  type="button"
                                  className="bg-green-500 rounded-sm"
                                  onClick={() => append("")}
                                >
                                  <Plus size={18} />
                                </Button>
                              )}
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => {
                                    console.log(index);
                                    remove(index);
                                  }}
                                >
                                  <Trash size={18} />
                                </Button>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex justify-end">
                <Button variant="secondary">
                  {subjectMutution.isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Save />
                  )}
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
