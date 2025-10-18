"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Assuming these components exist
import { Separator } from "@/components/ui/separator"; // Assuming this component exists
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // Assuming these components exists
import { AppSidebar2 } from "@/components/app-sidebar2"; // Assuming this component exists
import { useEffect } from "react" // Still used for potential side effects, though not explicitly in this example

export default function SubjectTablePage() {
  // Simplified data structure to match the xme.png image
  const subjects = [
    { id: 1, teacher: "Teacher A", subject: "English Language", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 2, teacher: "Teacher B", subject: "Mathematics", class: "Basic 4 white", term: 2, session: "2024/2025" },
    { id: 3, teacher: "Teacher C", subject: "Science", class: "Basic 4 white", term: 3, session: "2024/2025" },
    { id: 4, teacher: "Teacher D", subject: "Social Studies", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 5, teacher: "Teacher E", subject: "Health Education", class: "Basic 4 white", term: 2, session: "2024/2025" },
    { id: 6, teacher: "Teacher F", subject: "Civic Education", class: "Basic 4 white", term: 3, session: "2024/2025" },
    { id: 7, teacher: "Teacher G", subject: "Religion", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 8, teacher: "Teacher H", subject: "French", class: "Basic 4 white", term: 2, session: "2024/2025" },
    { id: 9, teacher: "Teacher I", subject: "Music", class: "Basic 4 white", term: 3, session: "2024/2025" },
    { id: 10, teacher: "Teacher J", subject: "Phonics/Diction", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 11, teacher: "Teacher K", subject: "Agricultural Science", class: "Basic 4 white", term: 2, session: "2024/2025" },
    { id: 12, teacher: "Teacher L", subject: "Computer Studies/ICT", class: "Basic 4 white", term: 3, session: "2024/2025" },
    { id: 13, teacher: "Teacher M", subject: "Home Economics", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 14, teacher: "Teacher N", subject: "Yoruba Language", class: "Basic 4 white", term: 2, session: "2024/2025" },
    { id: 15, teacher: "Teacher O", subject: "Spellings", class: "Basic 4 white", term: 3, session: "2024/2025" },
    { id: 16, teacher: "Teacher P", subject: "History", class: "Basic 4 white", term: 1, session: "2024/2025" },
    { id: 17, teacher: "Teacher Q", subject: "Vocational", class: "Basic 4 white", term: 2, session: "2024/2025" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(17); // State for 'Show X entries'
  const [currentPage, setCurrentPage] = useState(1); // State for current pagination page

  // Calculate total pages based on entriesPerPage
  const totalPages = Math.ceil(subjects.length / entriesPerPage);

  // Get subjects for the current page
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentSubjects = subjects.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
interface Subject {
    id: number;
    teacher: string;
    subject: string;
    class: string;
    term: number;
    session: string;
}

const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
};

  return (
    <SidebarProvider>
      {/* Assuming AppSidebar1 matches the sidebar in the image */}
      <AppSidebar2 />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {/* Search input in header */}
          <div className="relative flex-1 max-w-xs">
            <Input
              type="text"
              placeholder="Search"
              className="pl-8 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.533-1.21.364-1.17-.417-2.343-.878-3.442-1.823a9.75 9.75 0 0 1-1.823-3.442c-.169-.441-.012-.928.364-1.21l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg> {/* Phone icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg> {/* Dots icon */}
            <span className="font-semibold text-gray-800">JANET MARVELOUS</span>
            <span className="text-gray-500">STUDENT</span> {/* Changed to STUDENT as per image */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </div>
        </header>

        <div className="p-4 bg-gray-100 min-h-screen">
          {/* My Students heading */}
          <h1 className="text-xl font-semibold mb-4">My Students</h1>

          {/* Show entries dropdown */}
          <div className="flex items-center mb-4">
            <span className="text-sm mr-2">Show</span>
            <select
              aria-label="Entries per page"
              className="border border-gray-300 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page on entries change
              }}
            >
              <option value="10">10</option>
              <option value="17">17</option> {/* Matches the default in the image */}
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
            <span className="text-sm ml-2">entries</span>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto bg-white rounded shadow border border-gray-200">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">S/No</th>
                  <th className="p-3 border">Teachers</th>
                  <th className="p-3 border">Subject</th>
                  <th className="p-3 border">Class</th>
                  <th className="p-3 border">Term</th>
                  <th className="p-3 border">Session</th>
                </tr>
              </thead>
              <tbody>
                {currentSubjects.map((item, index) => (
                  <tr key={item.id} className="border-t border-gray-200">
                    <td className="p-3 border">{indexOfFirstEntry + index + 1}</td>
                    <td className="p-3 border">{item.teacher}</td>
                    <td className="p-3 border">{item.subject}</td>
                    <td className="p-3 border">{item.class}</td>
                    <td className="p-3 border">{item.term}</td>
                    <td className="p-3 border">{item.session}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4">
            <span className="text-sm">
              Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, subjects.length)} of {subjects.length} entries
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  className={currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
