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
import { Link, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/DeleteOutlined";
import { useGetAllTeachers } from "@/hooks/use-admin";
import { useState } from "react";
import { TeacherProfile } from "@/types/teacher";

export default function Page() {
  const [query, setQuery] = useState({ page: 1, limit: 10, search: "" });

  const { data, error, isLoading } = useGetAllTeachers(query);

  const handleNext = () => {
    const nextPage =
      query.page < data.meta?.total_pages ? query.page + 1 : query.page;
    setQuery((prev) => ({ ...prev, page: nextPage }));
  };
  const handlePrevious = () => {
    const prevPage = query.page > 1 ? query.page - 1 : query.page;
    setQuery((prev) => ({ ...prev, page: prevPage }));
  };

  return (
    <AdminLayout showSearch page="Teachers">
      <div className="px-4 mt-5">
        <div className="flex gap-1 items-center mb-4">
          <div className="flex items-center bg-[#E3E3E363]">
            <span className="pl-1 text-sm">Show</span>
            <Select
              onValueChange={(val) => {
                setQuery((prev) => ({ ...prev, limit: Number(val) }));
              }}
              value={String(query.limit)}
              defaultValue={String(query.limit)}
            >
              <SelectTrigger className="w-[70px] border-0 bg-[#E3E3E363] rounded-sm">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm">entries</span>
        </div>
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-1 pt-10">
            <Loader2 className="animate-spin" size={70} />
          </div>
        )}
        {data && (
          <div className="p-1 bg-white rounded-md">
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
                {data?.teachers.map((row: TeacherProfile, index: number) => {
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
                        {row.assigned_class?.name}
                      </TableCell>
                      <TableCell className="border border-primary">
                        {row.section}
                      </TableCell>
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
                })}
              </TableBody>
            </Table>
            <div className="flex gap-2 items-center justify-end py-2 text-primary/70">
              <Button
                disabled={query.page == 1}
                onClick={handlePrevious}
                size="sm"
                variant="ghost"
              >
                Previous
              </Button>

              {Array.from({ length: data.meta?.total_pages }).map(
                (_, index) => {
                  const page = index + 1;
                  const currentPage = data.meta?.current_page;
                  return (
                    <Button
                      key={`key-${index + 1}`}
                      size="sm"
                      variant={currentPage == page ? "default" : "outline"}
                      onClick={() => {
                        setQuery((prev) => ({ ...prev, page }));
                      }}
                    >
                      {page}
                    </Button>
                  );
                }
              )}

              <Button
                disabled={query.page == data.meta?.total_pages}
                onClick={handleNext}
                size="sm"
                variant="ghost"
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {error && <div>An error occur</div>}
      </div>
    </AdminLayout>
  );
}
