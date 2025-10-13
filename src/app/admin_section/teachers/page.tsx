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
import { Link, Trash, Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import Edit from "@mui/icons-material/Edit";
// import Delete from "@mui/icons-material/DeleteOutlined";
import { useGetAllTeachers } from "@/hooks/use-admin";
import { useEffect, useState } from "react";
import { TeacherProfile } from "@/types/teacher";
import Pagination from "@/components/ui/pagination";
import { QueryType } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import DeleteDialog from "@/components/shared/deleteDialog";

export default function Page() {
  const { setShowSearch } = useAuth();
  const [teacherQuery, setTeacherQuery] = useState<Partial<QueryType>>({
    page: 1,
    limit: 20,
  });
  const { data, error, isLoading } = useGetAllTeachers(teacherQuery);

  useEffect(() => {
    setShowSearch(true);
  }, []);

  return (
    <AdminLayout page="Teachers">
      <div className="px-4 mt-5">
        <div className="flex gap-2 items-center mb-3">
          <span className="pl-1 text-sm">Show</span>
          <Select
            onValueChange={(val) => {
              setTeacherQuery((prev) => ({ ...prev, limit: Number(val) }));
            }}
            value={String(teacherQuery.limit)}
            defaultValue={String(teacherQuery.limit)}
          >
            <SelectTrigger className="w-[80px] border-0 bg-[#E3E3E363] rounded-sm shadow-sm">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="w-20">
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
            <TeacherTableSkeleton limit={teacherQuery.limit || 20} />
          )}
          {data && !isLoading && (
            <Table className=" border rounded-xl border-primary">
              <TableHeader>
                <TableRow className="border-primary ">
                  <TableHead className=" border-primary border text-center">
                    S/No
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center border border-primary">
                    Profile
                  </TableHead>
                  <TableHead className="text-center border border-primary">
                    Class Assigned
                  </TableHead>
                  <TableHead className="border border-primary">
                    Section
                  </TableHead>
                  <TableHead className="border border-primary text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.teachers.length > 0 ? (
                  data?.teachers.map((row: TeacherProfile, index: number) => {
                    return (
                      <TableRow key={row._id} className="border-primary">
                        <TableCell className="text-center border border-primary">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.user?.name}</TableCell>
                        <TableCell className="border border-primary">
                          <Button size="sm" className="bg-green-500 w-full">
                            <Link />
                            Profile
                          </Button>
                        </TableCell>
                        <TableCell className="border border-primary">
                          {row.assigned_class?.name}
                        </TableCell>
                        <TableCell className="border border-primary">
                          {row.section}
                        </TableCell>
                        <TableCell className="flex justify-center">
                          <Button variant="ghost" className="text-primary/50">
                            <Pencil className="size-5" />
                          </Button>

                          <DeleteDialog
                            id={row.user?._id as string}
                            triggerComp={
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary/50"
                              >
                                <Trash className="text-red-400 size-5" />
                              </Button>
                            }
                          />
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
          )}
          {error && <div>An error occur</div>}
          <Pagination
            total_pages={data?.meta?.total_pages ?? 1}
            current_page={data?.meta?.current_page ?? 1}
            total_items={data?.meta?.total_teachers ?? 0}
            setQuery={setTeacherQuery}
            query={teacherQuery}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

function TeacherTableSkeleton({ limit }: { limit: number }) {
  return (
    <Table className=" border rounded-xl border-primary">
      <TableHeader>
        <TableRow className="border-primary ">
          <TableHead className="w-[26px] border-primary border">S/No</TableHead>
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
                <Skeleton className="h-8 w-8 mx-auto" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary w-32">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary w-32">
                <Skeleton className="w-full h-8" />
              </TableCell>
              <TableCell className="border border-primary">
                <div className="flex items-center gap-2 justify-center w-21">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
