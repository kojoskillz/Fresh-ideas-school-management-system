"use client";

import AdminLayout from "@/components/layouts/admin";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetResults,
  useGetAllStudents,
  useAddResultComment,
} from "@/hooks/use-admin";
import { useEffect, useState } from "react";
import { classes } from "@/lib/school_classes";
import { StudentProfile } from "@/types/student";
import {
  ResultCommentFormValue,
  resultCommentSchema,
  ScoreValue,
} from "@/lib/schemas/adminSchema";
import { usePersistedForm } from "@/hooks/use-persisted-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { QueryType } from "@/types/user";

export default function ViewResult() {
  const [query, setQuery] = useState<Partial<QueryType>>(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("result_query")
        : null;

    return saved
      ? JSON.parse(saved)
      : {
          term: "",
          session: "",
          class: { level: "", name: "" },
          student: { name: "", _id: "" },
        };
  });

  const { data } = useGetAllStudents(query);
  const { data: studentResult, isLoading, error } = useGetResults(query);

  const form = useForm({
    resolver: zodResolver(resultCommentSchema),
    defaultValues: {
      comment: studentResult?.comment?.comment,
      opened_days: studentResult?.comment?.opened_days,
      present_days: studentResult?.comment?.present_days,
      term: "",
      session: "",
      class: {},
      student: {},
    },
  });
  const commentMutation = useAddResultComment(form);

  const handleAddComment = (formData: ResultCommentFormValue) => {
    commentMutation.mutate(formData);
  };

  console.log(error, data, studentResult)

  useEffect(() => {
    localStorage.setItem("result_query", JSON.stringify(query));

    form.reset((data) => ({
      ...data,
      term: query.term as string,
      session: query.session as string,
      class: query.cls as { name: string; key: string },
      student: query.student as { user: { name: string }; _id: string },
    }));
  }, [query]);

  useEffect(() => {
    if (!studentResult) return;

    form.reset((val) => ({
      ...val,
      comment: studentResult?.comment?.comment ?? "",
      opened_days: studentResult?.comment?.opened_days ?? "",
      present_days: studentResult?.comment?.present_days ?? "",
    }));
  }, [studentResult]);

  return (
    <AdminLayout page="View Result">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        {Boolean(
          query.term && query.student?._id && query.cls?.key && query.session
        ) && (
          <div className="lg:text-xl font-normal text-primary pb-2">
            <span>Name: </span>
            <span className="font-bold lg:pr-10">
              {query?.student?.user?.name}:{" "}
            </span>
            <span>{query.cls?.name} </span>|
            <span className="capitalize">
              {" "}
              {query.term?.split("_").join(" ").toLowerCase()}{" "}
            </span>
            |<span> {query.session} Session</span>
          </div>
        )}

        <div className="p-1 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4 py-3 mb-6">
            <div>
              <Label className="mb-1">
                Session <sup>*</sup>
              </Label>

              <Select
                onValueChange={(value) => {
                  setQuery((prev) => ({
                    ...prev,
                    session: value,
                  }));
                }}
                defaultValue={query.session}
              >
                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                  <SelectValue placeholder="Select Session..." />
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
              <Label className=" mb-1">
                Class <sup>*</sup>
              </Label>

              <Select
                onValueChange={(value) => {
                  const selected = classes?.find(
                    (s: { key: string }) => s.key === value
                  );
                  if (!selected) return;

                  setQuery((prev) => ({
                    ...prev,
                    cls: selected,
                  }));
                }}
                defaultValue={query.cls?.key}
              >
                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                  <SelectValue placeholder="Select class..." />
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
                  setQuery((prev) => ({
                    ...prev,
                    term: value,
                  }));
                }}
                defaultValue={query.term}
              >
                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                  <SelectValue placeholder="Select term..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIRST_TERM">First term</SelectItem>
                  <SelectItem value="SECOND_TERM">Second term</SelectItem>
                  <SelectItem value="THIRD_TERM">Third term</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1">
                Student <sup>*</sup>
              </Label>

              <Select
                onValueChange={(value) => {
                  const student = data?.students?.find(
                    (s: { _id: string }) => s._id === value
                  );
                  if (!student) return;

                  setQuery((prev) => ({
                    ...prev,
                    student,
                  }));
                }}
                defaultValue={query.student?._id}
              >
                <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                  <SelectValue placeholder="Select student..." />
                </SelectTrigger>
                <SelectContent>
                  {data?.students?.map((student: StudentProfile) => (
                    <SelectItem key={student._id} value={student._id}>
                      {student?.user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {studentResult?.results.length > 0 && !isLoading && (
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[50px] border-primary/40 border text-center">
                      S/No
                    </TableHead>

                    <TableHead className="border border-primary/40 min-w-[200px]">
                      Subjects
                    </TableHead>
                    <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                      Projects
                    </TableHead>
                    <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                      Note
                    </TableHead>

                    <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                      Home Work
                    </TableHead>
                    <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
                      CA
                    </TableHead>

                    <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                      Exam
                    </TableHead>
                    <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
                      Grade
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentResult?.results.map(
                    (
                      row: {
                        _id: string;
                        scores: ScoreValue & { grade: string };
                        subject: { name: string };
                      },
                      index: number
                    ) => {
                      return (
                        <TableRow key={row._id}>
                          <TableCell className="text-center border border-primary/40">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-primary/40">
                            {row.subject.name}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.project}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.note}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.home_work}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.ca}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.exam}
                          </TableCell>
                          <TableCell className="border border-primary/40 text-center">
                            {row.scores.grade}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
                </TableBody>
              </Table>
              <div className="w-full">
                <div className="w-full flex items-center lg:gap-10 pt-2 font-normal text-sm">
                  <div>
                    <span>Position: </span>{" "}
                    <span>
                      {studentResult?.position ?? "Not Yet calculated"}
                    </span>
                  </div>
                  <div>
                    <span>Total Score: </span>{" "}
                    <span>
                      {studentResult?.total_score ?? "Not Yet calculated"}
                    </span>
                  </div>
                  <div>
                    <span>Average Score: </span>{" "}
                    <span>
                      {studentResult?.average_score ?? "Not Yet calculated"}
                    </span>
                  </div>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleAddComment)}
                    className="space-y-5 mt-5"
                  >
                    <FormField
                      name="comment"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-normal">
                            Enter comment
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-primary-foreground border-0 rounded-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex w-full gap-5 lg:gap-16">
                      <FormField
                        name="opened_days"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-normal">
                              Time School Opened
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                // onChange={(e) =>
                                //   field.onChange(e.target.valueAsNumber)
                                // }
                                type="number"
                                className="bg-primary-foreground border-0 rounded-sm"
                                placeholder="Enter how many time school opened"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name="present_days"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel className="font-normal">
                              Time Presents
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                // onChange={(e) =>
                                //   field.onChange(e.target.valueAsNumber)
                                // }
                                // onBlur={field.onBlur}
                                // name={field.name}
                                // ref={field.ref}
                                type="number"
                                className="bg-primary-foreground border-0 rounded-sm"
                                placeholder="Enter how many time studend present"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      type="submit"
                      className="w-full"
                      disabled={!form.formState.isDirty}
                    >
                      Insert
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          )}
          {isLoading && <ResultTableSkeleton />}
          {error && (
            <div className="text-center pb-5 font-semibold text-primary/80">
              And error occured, please try again later!
            </div>
          )}
          {Object.values(query).some((item) => !item) && !isLoading && (
            <div className="text-center py-4">No Record Selected!</div>
          )}
          {studentResult?.results.length < 1 && (
            <div className="text-center py-4">No Record Found</div>
          )}
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
            Subjects
          </TableHead>
          <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
            Projects
          </TableHead>
          <TableHead className="text-center border border-primary/40 min-w-[80px] lg:min-w-[110px] max-w-[110px]">
            Note
          </TableHead>

          <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
            Home Work
          </TableHead>
          <TableHead className="border border-primary/40 text-center min-w-[80px] lg:min-w-[110px] max-w-[110px]">
            CA
          </TableHead>

          <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
            Exam
          </TableHead>
          <TableHead className="whitespace-break-spaces border border-primary/40 text-center min-w-[80px] lg:min-w-[110px]">
            Grade
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 17 }).map((_, index: number) => {
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
