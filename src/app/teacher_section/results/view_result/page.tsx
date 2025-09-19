"use client";
import { useEffect, useState } from "react";
import { AppSidebar1 } from "@/components/app-sidebar1";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const subjectData = [
  { subject: "English Language", class: "Basic 4 white" },
  { subject: "Mathematics", class: "Basic 4 Blue" },
  { subject: "Science", class: "Basic 4 Green" },
  { subject: "Social Studies", class: "Basic 4 Red" },
  { subject: "Health Education", class: "Basic 4 Yellow" },
  { subject: "Civic Education", class: "Basic 4 white" },
  { subject: "Religion", class: "Basic 4 white" },
  { subject: "French", class: "Basic 4 white" },
  { subject: "Music", class: "Basic 4 white" },
  { subject: "Phonics/Diction", class: "Basic 4 white" },
  { subject: "Agricultural Science", class: "Basic 4 white" },
  { subject: "Computer Studies/ICT", class: "Basic 4 white" },
  { subject: "Home Economics", class: "Basic 4 white" },
  { subject: "Yoruba Language", class: "Basic 4 white" },
  { subject: "Spellings", class: "Basic 4 white" },
  { subject: "History", class: "Basic 4 white" },
  { subject: "Vocational", class: "Basic 4 white" },
];

export default function SubjectsPage() {
  const [teacherName, setTeacherName] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(subjectData.length / entriesPerPage);
  const paginatedSubjects = subjectData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setTeacherName(storedName);
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar1 />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>My Students</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

            <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-bold">My Students</h1>
                <Input placeholder="Search" className="w-1/3" />
            </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full table-auto text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                    <th className="p-3 border">S/No</th>
                    <th className="p-3 border">Subject</th>
                    <th className="p-3 border">Class</th>
                    <th className="p-3 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSubjects.map((item, index) => (
                    <tr key={item.subject} className="border-t">
                        <td className="p-3 border">{index + 1}</td>
                        <td className="p-3 border">{item.subject}</td>
                        <td className="p-3 border">{item.class}</td>
                        <td className="p-3 border">
                        <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1"
                            onClick={() => {
                            alert(`Go to result page for ${item.subject}`)
                            }}
                        >
                            <Plus className="w-4 h-4" />
                        </Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className="flex justify-between items-center p-4">
                <span className="text-sm">Showing 1 to 17 of 17 entries</span>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline">Previous</Button>
                    <Button size="sm" className="bg-blue-500 text-white">1</Button>
                    <Button size="sm" variant="outline">2</Button>
                    <Button size="sm" variant="outline">Next</Button>
                </div>
                </div>
            </div>
            </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
