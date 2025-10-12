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
import { Path, useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { classes } from "@/lib/school_classes";
import {
  useAddResult,
  useGetAllStudents,
  useGetAllSubject,
} from "@/hooks/use-admin";
import { useState, useMemo, useEffect } from "react";
import { StudentProfile } from "@/types/student";
import { Loader2 } from "lucide-react";
import { resultSchema, ResultFormValue } from "@/lib/schemas/adminSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryType } from "@/types/user";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const [resultQuery, setResultQuery] = useState<Partial<QueryType>>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("add-result-query");
      if (stored) return JSON.parse(stored);
    }
    return {
      cls: { name: "", key: "" },
      student: "",
      subject: { name: "", _id: "" },
      session: "",
      term: "",
    };
  });
  const { data: subjects } = useGetAllSubject();
  const { data, isError, isLoading } = useGetAllStudents(resultQuery);
  const { setShowSearch } = useAuth();

  const resultsValue: ResultFormValue = useMemo(() => {
    if (!data) return { results: [] };

    return {
      results: data?.students?.map((item: StudentProfile) => ({
        subject: resultQuery.subject,
        term: resultQuery.term,
        student: item,
        class: resultQuery.cls,
        session: resultQuery.session,
        scores: {
          project: "",
          note: "",
          home_work: "",
          ca: "",
          exam: "",
        },
      })),
    };
  }, [
    resultQuery.subject?._id,
    resultQuery.term,
    resultQuery.cls?.key,
    resultQuery.session,
    data?.students,
  ]);

  const form = useForm<ResultFormValue>({
    resolver: zodResolver(resultSchema),
    defaultValues: resultsValue,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "results",
  });

  const resultMutation = useAddResult(form);

  const handleSubmitHandler = (data: ResultFormValue) =>
    resultMutation.mutate(data);

  function updateAllResultsField(
    field: keyof ResultFormValue["results"][number],
    value: string
  ) {
    const current = form.getValues("results") || [];
    const updated = current.map((row) => ({
      ...row,
      [field]: value,
    }));
    form.setValue("results", updated, { shouldDirty: true });
  }

  useEffect(() => {
    localStorage.setItem("add-result-query", JSON.stringify(resultQuery));
  }, [resultQuery]);

  useEffect(() => {
    if (!resultsValue) return;

    form.reset(resultsValue);
  }, [resultsValue]);

  useEffect(() => {
    setShowSearch(true);
  }, []);

  return (
    <AdminLayout page="Add Result">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="p-1 bg-white rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitHandler)}>
              <div className="mb-5">
                {Boolean(
                  resultQuery?.subject?.name &&
                    resultQuery?.subject?._id &&
                    resultQuery?.cls?.name
                ) && (
                  <h4 className="text-xl lg:text-2xl border-b pb-1">
                    My Result - {resultQuery.subject?.name}{" "}
                    {resultQuery.cls?.name}
                  </h4>
                )}
                <div className="grid grid-cols-2 gap-4 py-3">
                  <div>
                    <Label className="mb-1">
                      Session <sup>*</sup>
                    </Label>

                    <Select
                      onValueChange={(value) => {
                        setResultQuery((prev) => ({
                          ...prev,
                          session: value,
                        }));
                        updateAllResultsField("session", value);
                      }}
                      value={resultQuery.session}
                    >
                      <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["2024/2025", "2025/2026"].map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className=" mb-1">
                      Class <sup>*</sup>
                    </Label>

                    <Select
                      onValueChange={(value) => {
                        const cls: { name: string; key: string } | undefined =
                          classes.find((cls) => cls.key == value);

                        if (!cls) return;

                        setResultQuery((prev) => ({
                          ...prev,
                          cls: cls,
                        }));
                        updateAllResultsField("class", value);
                      }}
                      value={resultQuery?.cls?.key || ""}
                    >
                      <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                        <SelectValue />
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
                    <Label className="mb-1">
                      Term <sup>*</sup>
                    </Label>

                    <Select
                      onValueChange={(value) => {
                        setResultQuery((prev) => ({
                          ...prev,
                          term: value,
                        }));
                        updateAllResultsField("term", value);
                      }}
                      value={resultQuery.term}
                    >
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
                    <Label className="mb-1">
                      Subject <sup>*</sup>
                    </Label>

                    <Select
                      onValueChange={(value) => {
                        const selected = subjects.find(
                          (sub: { name: string; _id: string }) =>
                            sub._id === value
                        );
                        if (!selected) return;
                        setResultQuery((prev) => ({
                          ...prev,
                          subject: selected,
                        }));
                        updateAllResultsField("subject", value);
                      }}
                      value={resultQuery?.subject?._id}
                    >
                      <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {subjects?.map(
                          (subject: { name: string; _id: string }) => (
                            <SelectItem
                              className="data-[selected=true]:bg-red-600"
                              key={subject._id}
                              value={subject._id}
                            >
                              {subject.name}
                            </SelectItem>
                          )
                        ).sort()}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                {isLoading && <ResultTableSkeleton />}
                {isError && (
                  <div className="text-center py-10 border-t mt-10">
                    <span>An Error occured, please try again later!</span>
                  </div>
                )}
                {!isLoading && fields.length > 0 && (
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
                          <TableRow key={index}>
                            <TableCell className="text-center border border-primary/40">
                              {index + 1}
                            </TableCell>

                            <TableCell className="border border-primary/40">
                              {row.student?.user.name}
                            </TableCell>

                            {Object.keys(row?.scores).map((str) => (
                              <TableCell
                                className="border border-primary/40 text-center"
                                key={str}
                              >
                                <FormField
                                  name={
                                    `results.${index}.scores.${str}` as Path<ResultFormValue>
                                  }
                                  control={form.control}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl className="">
                                        <Input
                                          type="number"
                                          className="w-full h-8 border-0 bg-primary-foreground placeholder:text-xs"
                                          onChange={(e) =>
                                            field.onChange(
                                              e.target.valueAsNumber
                                            )
                                          }
                                          // {...field}
                                          placeholder="Enter score..."
                                          onBlur={field.onBlur}
                                          name={field.name}
                                          ref={field.ref}
                                        />
                                      </FormControl>
                                      <FormMessage className="text-xs text-left" />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>
                            ))}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </div>

              {fields.length === 0 && (
                <div className="text-center py-10 border-t mt-10">
                  <span>No Student found</span>
                </div>
              )}

              {fields.length != 0 && !isError && (
                <div className="flex flex-col-reverse items-center gap-4 py-2 justify-between sm:flex-row">
                  <Button variant="secondary" type="submit">
                    {resultMutation.isPending && (
                      <Loader2 className="animate-spin" />
                    )}
                    Add Result
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}

function ResultTableSkeleton() {
  return (
    <Table className=" border rounded-xl border-primary">
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
        {Array.from({ length: 10 }).map((_, index: number) => {
          return (
            <TableRow key={index} className="border-primary/40">
              <TableCell className="text-center border border-primary/40">
                <Skeleton className="h-8 w-8 mx-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary/40">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary/40">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary/40">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary/40">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary/40">
                <Skeleton className="w-full h-8" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
