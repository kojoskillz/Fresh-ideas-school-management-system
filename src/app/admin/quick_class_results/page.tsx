"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/DeleteOutlined";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { QueryType } from "@/types/user";
import { StudentProfile } from "@/types/student";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetExtraResults } from "@/hooks/use-result";
import { useGetAllSubjects } from "@/hooks/use-shared";
import AdminLayout from "@/components/layouts/admin";

export default function Page() {
  const { setShowSearch } = useAuth();
  const [quickResultsQuery, setQuickResultQuery] = useState<Partial<QueryType>>(
    () => {
      if (typeof window !== "undefined") {
        const savedQuery = localStorage.getItem("quick-result-query");
        if (savedQuery) return JSON.parse(savedQuery);
      }

      return {
        page: 1,
        limit: 20,
        session: "",
        term: "",
        cls: {
          key: "",
          name: "",
        },
      };
    }
  );

  const {
    data,
    error,
    isLoading: isResultLoading,
  } = useGetExtraResults(quickResultsQuery);
  const { data: subjectsData } = useGetAllSubjects({ limit: 1000 });

  useEffect(() => {
    setShowSearch(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "quick-result-query",
      JSON.stringify(quickResultsQuery)
    );
  }, [quickResultsQuery]);

  return (
    <AdminLayout page="Quick Class Results">
      <div className="px-4 mt-5 overflow-x-auto w-full pb-5">
        <div className="p-1 bg-white rounded-md">
          <div className="w-full">
            <h4 className="text-xl lg:text-2xl border-b pb-1">
              My Result - ENGLISH LANGUAGE Basic Four White
            </h4>
            <div className="space-y-5 py-5">
              <div className="flex ">
                <Label className="mb-1 min-w-26">
                  Session <sup>*</sup>
                </Label>

                <Select
                  onValueChange={(value) =>
                    setQuickResultQuery((prev) => ({ ...prev, session: value }))
                  }
                  value={quickResultsQuery.session}
                >
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue />
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

              <div className="flex">
                <Label className="mb-1 min-w-26">
                  Term <sup>*</sup>
                </Label>

                <Select
                  onValueChange={(value) =>
                    setQuickResultQuery((prev) => ({ ...prev, term: value }))
                  }
                  value={quickResultsQuery.term}
                >
                  <SelectTrigger className="w-full border-0 bg-primary-foreground rounded-sm">
                    <SelectValue defaultValue="first" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIRST_TERM">First term</SelectItem>
                    <SelectItem value="SECOND_TERM">Second term</SelectItem>
                    <SelectItem value="THIRD_TERM">Third term</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="w-full">
            {isResultLoading ? (
              <QuickResultTableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      "S/No",
                      "Admisssion No",
                      "Name",
                      ...(subjectsData?.subjects
                        ?.map((item: { name: string }) => item.name)
                        ?.sort() || []),

                      "Action",
                    ].map((str) => (
                      <TableHead
                        key={str}
                        className="border-primary/40 border text-center min-w-26 capitalize whitespace-break-spaces"
                      >
                        {str}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {error ? (
                    <TableRow>
                      <TableCell
                        className="text-center pt-2 font-semibold text-primary/80"
                        colSpan={10}
                      >
                        Something went wrong, please try again later!
                      </TableCell>
                    </TableRow>
                  ) : data?.student_with_results?.length > 0 ? (
                    data?.student_with_results?.map(
                      (
                        row: StudentProfile & {
                          results: { total: number }[];
                        },
                        index: number
                      ) => {
                        return (
                          <TableRow key={row._id}>
                            <TableCell className="text-center border border-primary/40">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-center border border-primary/40">
                              {row.admission_number}
                            </TableCell>
                            <TableCell className="border border-primary/40">
                              {row.user?.name}
                            </TableCell>
                            {row.results?.map((result) => (
                              <TableCell className="border border-primary/40 text-center">
                                <div className="w-full py-1.5 h-8 bg-primary-foreground rounded-sm">
                                  {result?.total}
                                </div>
                              </TableCell>
                            ))}

                            <TableCell
                              arial-label="Edit button"
                              className="border border-primary/40"
                            >
                              <Button
                                variant="ghost"
                                className="text-primary/50"
                              >
                                <Edit />
                              </Button>
                              <Button variant="ghost" className="text-red-400">
                                <Delete />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )
                  ) : Boolean(
                      !quickResultsQuery.term && !quickResultsQuery.session
                    ) ? (
                    <TableRow>
                      <TableCell
                        className="text-center pt-2 font-semibold text-primary/80"
                        colSpan={10}
                      >
                        No record selected
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell
                        className="text-center font-semibold text-primary/80"
                        colSpan={10}
                      >
                        No result found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="flex flex-col-reverse items-center gap-4 py-2 justify-between sm:flex-row w-full">
            <Pagination
              current_page={data?.meta?.current_page ?? 1}
              total_pages={data?.meta?.total_pages ?? 1}
              total_items={data?.meta?.total_items || 0}
              setQuery={setQuickResultQuery}
              query={quickResultsQuery}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function QuickResultTableSkeleton() {
  return (
    <Table className=" border rounded-xl border-primary">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[50px] border-primary/40 border text-center">
            S/No
          </TableHead>

          <TableHead className="border border-primary/40 ">
            Admission No
          </TableHead>
          <TableHead className="text-center border border-primary/40 ">
            Name
          </TableHead>
          <TableHead className="text-center border border-primary/40">
            Agricultural Science
          </TableHead>

          <TableHead className="border border-primary/40 text-center">
            Civic Education
          </TableHead>
          <TableHead className="border border-primary/40 text-center">
            Computer Studies/ICT
          </TableHead>

          <TableHead className="whitespace-break-spaces border border-primary/40 text-center ">
            English Language
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
