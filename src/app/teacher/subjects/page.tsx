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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryType } from "@/types/user";
import TeacherLayouts from "@/components/layouts/teacher";
import { useGetAllSubjects } from "@/hooks/use-shared";
import { useState } from "react";

export default function Subjects() {

  const [query, setQuery] = useState<Partial<QueryType>>({
    page: 1,
    limit: 5,
  });
  
  const { data, isError, isLoading } = useGetAllSubjects(query);



  return (
    <TeacherLayouts page="Subjects">
      <div className="px-4 mt-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="pl-1 text-sm">Show</span>
          <Select
            onValueChange={(val) => {
              setQuery((prev) => ({ ...prev, limit: Number(val) }));
            }}
            value={String(query?.limit)}
            defaultValue={String(query?.limit)}
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
          {isLoading && <StudentTableSkeleton limit={query?.limit ?? 20} />}
          {data && (
            <>
              <Table className=" border rounded-xl border-primary">
                <TableHeader>
                  <TableRow className="border-primary ">
                    <TableHead className="w-[26px] border-primary border">
                      S/No
                    </TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.subjects?.length > 0 ? (
                    data?.subjects?.map((row: any, index: number) => {
                      return (
                        <TableRow key={row._id} className="border-primary">
                          <TableCell className="text-center border border-primary">
                            {index + 1}
                          </TableCell>
                          <TableCell className="capitalize">
                            {row.name}
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
                total_items={data?.meta?.total_items ?? 0}
                setQuery={setQuery}
                query={query}
              />
            </>
          )}
        </div>
        {isError && <div>An error occur</div>}
      </div>
    </TeacherLayouts>
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
