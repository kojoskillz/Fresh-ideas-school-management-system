"use client";

import AdminLayout from "@/components/layouts/admin";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classes } from "@/lib/class";
import { useGetAllStudents } from "@/hooks/use-admin";
import { useState, useMemo, useEffect } from "react";
import { StudentProfile } from "@/types/student";
import { Loader2 } from "lucide-react";
import { usePersistedForm } from "@/hooks/use-persisted-form";

const resultSchema = z.object({
  _id: z.number(),
  name: z.string(),
  projects: z.number().min(0).max(100).optional(),
  note: z.number().min(0).max(100).optional(),
  homeWork: z.number().min(0).max(100).optional(),
  ca: z.number().min(0).max(100).optional(),
  exam: z.number().min(0).max(100).optional(),
});

const formSchema = z.object({
  results: z.array(resultSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function Page() {
  const [filter, setFilter] = useState({
    limit: 1,
    page: 1,
    class_name: "",
  });
  
  const { data, isError, isLoading } = useGetAllStudents(filter);

  const initialRows = useMemo(() => {
    if (data) {
      return data.students?.map((item: StudentProfile) => ({
        _id: item._id,
        name: item.user.name,
        projects: undefined,
        note: undefined,
        ca: undefined,
        exam: undefined,
        homeWork: undefined,
      }));
    }
  }, [data]);

  const defaultValues: FormValues = { results: initialRows };

  const form = usePersistedForm("add-results-form-value", {
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "results",
  });

  const handleSubmitHandler = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (!initialRows) return;
    form.setValue("results", initialRows);
  }, [initialRows]);

  return (
    <AdminLayout page="Add Result">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="p-1 bg-white rounded-md">
          <div>
            {/* <h4 className="text-xl lg:text-2xl border-b pb-1">
              My Result - ENGLISH LANGUAGE Basic Four White
            </h4> */}
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <Label className="min-w-[100px]">
                  Session <sup>*</sup>
                </Label>

                <Select
                  onValueChange={(value) => {
                    console.log(value);
                  }}
                >
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue="2024/2025" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2024/2025", "2025/2026"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="min-w-[100px]">
                  Class <sup>*</sup>
                </Label>

                <Select
                  onValueChange={(value) => {
                    setFilter((prev) => ({ ...prev, class_name: value }));
                  }}
                >
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue="2/24/2025" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((item) => (
                      <SelectItem key={item.key} value={item.key}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="min-w-[100px]">
                  Term <sup>*</sup>
                </Label>

                <Select>
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue="first" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIRST_TERM">1st</SelectItem>
                    <SelectItem value="SECOND_TERM">2nd</SelectItem>
                    <SelectItem value="THIRD_TERM">3rd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="min-w-[100px]">
                  Subject <sup>*</sup>
                </Label>

                <Select>
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue="first" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">1st</SelectItem>
                    <SelectItem value="second">2nd</SelectItem>
                    <SelectItem value="third">3rd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-1 pt-10">
              <Loader2 className="animate-spin" size={70} />
            </div>
          ) : isError ? (
            <div className="text-center py-10 border-t mt-10">
              <span>An Error occured, please try again later!</span>
            </div>
          ) : fields.length > 0 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitHandler)}>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[50px] border-primary/40 border text-center">
                          S/No
                        </TableHead>

                        <TableHead className="border border-primary/40 min-w-[200px]">
                          Name
                        </TableHead>
                        <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                          Add Projects
                        </TableHead>
                        <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                          Add Note
                        </TableHead>

                        <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                          Add Home Work
                        </TableHead>
                        <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                          Add CA
                        </TableHead>

                        <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                          Add Exam
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fields.map((row, index) => {
                        return (
                          <TableRow key={row._id}>
                            <TableCell className="text-center border border-primary/40">
                              {index + 1}
                            </TableCell>

                            <TableCell className="border border-primary/40">
                              {row.name}
                            </TableCell>

                            {["projects", "note", "homeWork", "ca", "exam"].map(
                              (key) => (
                                <TableCell
                                  className="border border-primary/40 text-center"
                                  key={key}
                                >
                                  <FormField
                                    name={`results.${index}.${
                                      key as keyof FormValues["results"][number]
                                    }`}
                                    control={form.control}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl className="">
                                          <Input
                                            {...field}
                                            type="number"
                                            className="w-full h-8 border-0 bg-primary-foreground"
                                            onChange={(e) =>
                                              field.onChange(
                                                e.target.valueAsNumber
                                              )
                                            }
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-col-reverse items-center gap-4 py-2 justify-between sm:flex-row">
                  <Button variant="secondary" type="submit">
                    Add Result
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="text-center py-10 border-t mt-10">
              <span>No Student found</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
