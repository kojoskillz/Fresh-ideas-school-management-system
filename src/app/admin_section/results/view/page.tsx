"use client";

import AdminLayout from "@/components/layouts/admin";
import { PrintIcon } from "@/components/svgs/PrintIcon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";

export default function ViewResult() {
  const form = useForm();
  return (
    <AdminLayout
      page="View Result"
      header={
        <div className="flex items-center justify-between">
          <span>Result sheet</span>{" "}
          <Button variant="ghost">
            <PrintIcon />
          </Button>
        </div>
      }
    >
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="lg:text-xl font-normal text-primary pb-2">
          <span>Name: </span>
          <span className="font-bold lg:pr-10">JANET MARVELOUS: </span>
          <span>Basic Four white </span>|<span> 3rd Term </span>|
          <span> 2024/2025 Session</span>
        </div>
        <div className="p-1 bg-white rounded-md">
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
                {initialRows.map((row, index) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="text-center border border-primary/40">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border border-primary/40">
                        {row.name}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {row.projects}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {row.note}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {row.homeWork}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {row.ca}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {row.exam}
                      </TableCell>
                      <TableCell className="border border-primary/40 text-center">
                        {(row.projects ? Number(row.projects) : 0) +
                          (row.projects ? Number(row.note) : 0) +
                          (row.projects ? Number(row.homeWork) : 0) +
                          (row.projects ? Number(row.ca) : 0) +
                          (row.projects ? Number(row.exam) : 0)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="w-full">
              <div className="w-full flex items-center lg:gap-10 pt-2 font-normal text-sm">
                <div>
                  <span>Position: </span> <span>Not Yet calculated</span>
                </div>
                <div>
                  <span>Total Score: </span> <span>Not Yet calculated</span>
                </div>
                <div>
                  <span>Average Score: </span> <span>Not Yet calculated</span>
                </div>
              </div>
              <Form {...form}>
                <form className="space-y-5 mt-5">
                  <FormField
                    name="dropdown-comment"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dropdown comment</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-primary-foreground border-0 rounded-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="comment"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter comment</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-primary-foreground border-0 rounded-sm"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full gap-5 lg:gap-16">
                    <FormField
                      name="opened_days"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Time School Opened</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-primary-foreground border-0 rounded-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="time_present"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Enter comment</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-primary-foreground border-0 rounded-sm"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button variant="secondary" type="submit" className="w-full">
                    Insert
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

const initialRows = [
  {
    id: 1,
    name: "English",
    projects: 18,
    note: 10,
    ca: 7,
    exam: 50,
    homeWork: 5,
  },
  {
    id: 2,
    name: "Mathematics",
    projects: 15,
    note: 8,
    ca: 7,
    exam: 50,
    homeWork: 8,
  },
  {
    id: 3,
    name: "Science",
    projects: 18,
    note: 10,
    ca: 8,
    exam: 50,
    homeWork: 10,
  },
  {
    id: 4,
    name: "Social Studies",
    projects: 18,
    note: 10,
    ca: 9,
    exam: 50,
    homeWork: 8,
  },
  {
    id: 5,
    name: "Health Education",
    projects: 17,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 7,
  },
  {
    id: 6,
    name: "Civil Education",
    projects: 16,
    note: 9,
    ca: 10,
    exam: 50,
    homeWork: 5,
  },
  {
    id: 7,
    name: "Religion",
    projects: 20,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 2,
  },
  {
    id: 8,
    name: "French",
    projects: 19,
    note: 9,
    ca: 9,
    exam: 50,
    homeWork: 3,
  },
  {
    id: 9,
    name: "Music",
    projects: 18,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 2,
  },
  {
    id: 10,
    name: "Phonics/Diction",
    projects: 17,
    note: 10,
    ca: 9,
    exam: 50,
    homeWork: 4,
  },
  {
    id: 11,
    name: "Agricultural Science",
    projects: 20,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 10,
  },
  {
    id: 12,
    name: "Computer Studies/ICT",
    projects: 15,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 5,
  },
  {
    id: 13,
    name: "Home Economics",
    projects: 18,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 7,
  },
  {
    id: 14,
    name: "Yoruba Language",
    projects: 16,
    note: 10,
    ca: 9,
    exam: 50,
    homeWork: 9,
  },
  {
    id: 15,
    name: "Spellings",
    projects: 20,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 8,
  },
  {
    id: 16,
    name: "History",
    projects: 19,
    note: 10,
    ca: 9,
    exam: 50,
    homeWork: 2,
  },
  {
    id: 17,
    name: "Vocational",
    projects: 18,
    note: 10,
    ca: 10,
    exam: 50,
    homeWork: 1,
  },
];
