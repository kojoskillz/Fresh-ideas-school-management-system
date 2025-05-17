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

const resultSchema = z.object({
  id: z.number(),
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
  const defaultValues: FormValues = { results: initialRows };

  const form = useForm({
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

  return (
    <AdminLayout page="Add Result" header="Add Result">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="p-1 bg-white rounded-md">
          <div>
            <h4 className="text-xl lg:text-2xl border-b pb-1">
              My Result - ENGLISH LANGUAGE Basic Four White
            </h4>
            <div className="space-y-5 py-5">
              <div className="flex">
                <Label className="min-w-[100px]">
                  Session <sup>*</sup>
                </Label>
                {/* <Input
                  value="2/24/2025"
                  className="border-0 bg-primary-foreground rounded-sm"
                  isReadOnly
                /> */}
                <Select>
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue={"2/24/2025"} />
                  </SelectTrigger>
                  <SelectContent>
                    {["2/24/2025", "2/24/2024"].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex">
                <Label className="min-w-[100px]">
                  Term <sup>*</sup>
                </Label>
                {/* <Input
                  type="sm"
                  value="3rd"
                  className="border-0 bg-primary-foreground rounded-sm"
                  r
                /> */}
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
                        <TableRow key={row.id}>
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
                <Button variant="secondary" type="submit">Add Result</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </AdminLayout>
  );
}

const initialRows = [
  {
    id: 1,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 2,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 3,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 4,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 5,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 6,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 7,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 8,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 9,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 10,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 11,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 12,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 13,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 14,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 15,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 16,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 17,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 18,
    name: "John Doe",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 19,
    name: "Florence",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
  {
    id: 20,
    name: "Joy",
    projects: undefined,
    note: undefined,
    ca: undefined,
    exam: undefined,
    homeWork: undefined,
  },
];
