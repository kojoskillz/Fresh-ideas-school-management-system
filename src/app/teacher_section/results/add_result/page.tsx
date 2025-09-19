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

const initialStudents = [
  "Joy", "James", "Maria", "Prince", "Freda", "Abayomi", "Francis",
  "Joy", "James", "Maria", "Prince", "Freda", "Abayomi", "Francis", "Prince", "Freda", "Abayomi"
];

export default function ResultPage() {
  const [teacherName, setTeacherName] = useState("");
  const [session, setSession] = useState("2024/2025");
  const [term, setTerm] = useState("3rd");

  const [results, setResults] = useState(
    initialStudents.map((name, idx) => ({
      id: idx + 1,
      name,
      projects: "",
      note: "",
      homework: "",
      ca: "",
      exam: ""
    }))
  );

  type Result = {
    id: number;
    name: string;
    projects: string;
    note: string;
    homework: string;
    ca: string;
    exam: string;
    [key: string]: string | number;
  };

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setTeacherName(storedName);
    }
  }, []);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedResults = [...results];
    (updatedResults[index] as Result)[field] = value;
    setResults(updatedResults);
  };

  return (
    <SidebarProvider>
      <AppSidebar1 />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Result Input</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex flex-1 flex-col bg-gray-100 p-4 overflow-auto">
          <div className="bg-white p-4 rounded-md shadow-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              My Result – ENGLISH LANGUAGE Basic Four White
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <strong>Session:</strong> {session}
              </div>
              <div>
                <strong>Term:</strong> {term}
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-1">S/No</th>
                    <th className="border px-2 py-1">Name</th>
                    <th className="border px-2 py-1">Add Projects</th>
                    <th className="border px-2 py-1">Add Note</th>
                    <th className="border px-2 py-1">Add Homework</th>
                    <th className="border px-2 py-1">Add CA</th>
                    <th className="border px-2 py-1">Add Exam</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((student, index) => (
                    <tr key={index} className="bg-white even:bg-gray-50">
                      <td className="border px-2 py-1 text-center">{student.id}</td>
                      <td className="border px-2 py-1">{student.name}</td>
                      {["projects", "note", "homework", "ca", "exam"].map((field) => (
                        <td key={field} className="border px-2 py-1">
                          <input
                            type="text"
                            placeholder={field}
                            value={(student as any)[field]}
                            onChange={(e) => handleInputChange(index, field, e.target.value)}
                            className="w-full border rounded px-1 py-0.5 text-sm"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Add Result
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
