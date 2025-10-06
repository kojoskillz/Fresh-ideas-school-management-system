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
import { Link } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { useGetAllStudents } from "@/hooks/use-admin";
import { StudentProfile } from "@/types/student";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { QueryType } from "@/types/user";

export default function Page() {
  const [studentQuery, setStudentQuery] = useState<Partial<QueryType>>({
    page: 1,
    limit: 20,
  });
  const { setShowSearch } = useAuth();
  const { data, isError, isLoading } = useGetAllStudents(studentQuery);

  useEffect(() => {
    setShowSearch(true);
  }, []);

  return (
    <AdminLayout page="Students">
      <div className="px-4 mt-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="pl-1 text-sm">Show</span>
          <Select
            onValueChange={(val) => {
              setStudentQuery((prev) => ({ ...prev, limit: Number(val) }));
            }}
            value={String(studentQuery?.limit)}
            defaultValue={String(studentQuery?.limit)}
          >
            <SelectTrigger className="w-[80px] border-0 bg-[#E3E3E363] shadow-sm rounded-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">entries</span>
        </div>

        <div className="p-1 bg-white rounded-md">
          {isLoading && (
            <StudentTableSkeleton limit={studentQuery?.limit ?? 20} />
          )}
          {data && (
            <>
              <Table className=" border rounded-xl border-primary">
                <TableHeader>
                  <TableRow className="border-primary ">
                    <TableHead className="w-[26px] border-primary border">
                      S/No
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[85px] text-center border border-primary">
                      Profile
                    </TableHead>
                    <TableHead className="text-center border border-primary">
                      Class Assigned
                    </TableHead>
                    <TableHead className="border border-primary">
                      Section
                    </TableHead>
                    <TableHead className="border border-primary w-[90px] text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.students.length > 0 ? (
                    data.students?.map((row: StudentProfile, index: number) => {
                      return (
                        <TableRow key={row._id} className="border-primary">
                          <TableCell className="text-center border border-primary">
                            {index + 1}
                          </TableCell>
                          <TableCell>{row.user?.name}</TableCell>
                          <TableCell className="border border-primary">
                            <Button size="sm" className="bg-green-500">
                              <Link />
                              Profile
                            </Button>
                          </TableCell>
                          <TableCell className="border border-primary">
                            {row.class?.name}
                          </TableCell>
                          <TableCell className="border border-primary"></TableCell>
                          <TableCell className="border border-primary">
                            <Button variant="ghost" className="text-primary/50">
                              <Edit />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-primary/50"
                            >
                              <Delete />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-primary/70"
                      >
                        No record found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <Pagination
                total_pages={data?.meta?.total_pages ?? 0}
                current_page={data?.meta?.current_page ?? 0}
                total_items={data?.meta?.total_students ?? 0}
                setQuery={setStudentQuery}
                query={studentQuery}
              />
            </>
          )}
        </div>
        {isError && <div>An error occur</div>}
      </div>
    </AdminLayout>
  );
}

function StudentTableSkeleton({ limit }: { limit: number }) {
  return (
    <Table className=" border rounded-xl border-primary">
      <TableHeader>
        <TableRow className="border-primary ">
          <TableHead className="border-primary border text-center">
            S/No
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[85px] text-center border border-primary">
            Profile
          </TableHead>
          <TableHead className="text-center border border-primary">
            Class Assigned
          </TableHead>
          <TableHead className="border border-primary">Section</TableHead>
          <TableHead className="border border-primary w-[90px] text-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: limit }).map((_, index: number) => {
          return (
            <TableRow key={index} className="border-primary">
              <TableCell className="text-center border border-primary">
                <Skeleton className="h-6 w-6 mx-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell className="border border-primary w-32">
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell className="border border-primary">
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell className="border border-primary w-32">
                <Skeleton className="w-full h-6" />
              </TableCell>
              <TableCell className="border border-primary">
                <div className="flex items-center gap-2 justify-center w-21">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-6 w-6" />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
