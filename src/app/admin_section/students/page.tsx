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

const initialRows = [
  {
    id: 1,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 2,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 3,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 4,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 5,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 6,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 7,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 8,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 9,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 10,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 11,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 12,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 13,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 14,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 15,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 16,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 17,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 19,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 19,
    name: "Florence",
    class: "Basic 2 A",
    section: "Basic 2",
  },
  {
    id: 20,
    name: "Joy",
    class: "Basic 2 A",
    section: "Basic 2",
  },
];

export default function Page() {
  return (
    <AdminLayout page="Students" header="Students List">
      <div className="px-4 mt-5">
        <div className="flex gap-1 items-center">
          <div className="flex items-center bg-[#E3E3E363]">
            <span className="pl-1 text-sm">Show</span>
            <Select>
              <SelectTrigger className="w-[70px] border-0 bg-[#E3E3E363] rounded-sm">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm">entries</span>
        </div>
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
                <TableHead className="border border-primary">Section</TableHead>
                <TableHead className="border border-primary w-[90px] text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialRows.map((row, index) => {
                return (
                  <TableRow key={row.id} className="border-primary">
                    <TableCell className="text-center border border-primary">
                      {index + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell className="border border-primary">
                      <Button size="sm" className="bg-green-500">
                        <Link />
                        Profile
                      </Button>
                    </TableCell>
                    <TableCell className="border border-primary">
                      {row.class}
                    </TableCell>
                    <TableCell className="border border-primary">
                      {row.section}
                    </TableCell>
                    <TableCell className="border border-primary">
                      <Button variant="ghost" className="text-primary/50">
                        <Edit />
                      </Button>
                      <Button variant="ghost" className="text-red-400">
                        <Delete />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="flex gap-2 items-center justify-end py-2 text-primary/70">
            <Button size="sm" variant="ghost">
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-[#494BDD] text-white"
            >
              1
            </Button>
            <Button size="sm" variant="outline">
              2
            </Button>
            <Button size="sm" variant="outline">
              3
            </Button>
            <Button size="sm" variant="ghost">
              Next
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
