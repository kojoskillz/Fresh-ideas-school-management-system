"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// No longer needed: Plus from 'lucide-react'
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
import { AppSidebar1 } from "@/components/app-sidebar1"; // Assuming this component exists
import { useEffect } from "react" // Still used for potential side effects, though not explicitly in this example

export default function SubjectTablePage() {
  // Enhanced data structure to match the image's content
  const subjects = [
    { id: 1, subject: "English Language", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 2, subject: "Mathematics", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "C" },
    { id: 3, subject: "Science", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "B" },
    { id: 4, subject: "Social Studies", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "B" },
    { id: 5, subject: "Health Education", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 6, subject: "Civic Education", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 7, subject: "Religion", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 8, subject: "French", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 9, subject: "Music", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 10, subject: "Phonics/Diction", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 11, subject: "Agricultural Science", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 12, subject: "Computer Studies/ICT", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 13, subject: "Home Economics", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 14, subject: "Yoruba Language", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 15, subject: "Spellings", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 16, subject: "History", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
    { id: 17, subject: "Vocational", projects: 10, note: 5, homeWork: 5, ca: 18, exam: 55, total: 93, grade: "A" },
  ];

  // Calculate Total Score and Average Score dynamically (example)
  const totalScore = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = (totalScore / subjects.length).toFixed(2); // To 2 decimal places

  const [selectedComment, setSelectedComment] = useState(""); // State for dropdown
  const [enteredComment, setEnteredComment] = useState("An excellent performance, keep it up"); // State for text input

  return (
    <SidebarProvider>
      {/* Assuming AppSidebar1 matches the sidebar in the image */}
      <AppSidebar1 />
      <SidebarInset>
        {/* Header Section */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Search
          </div>
          <div className="ml-auto flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.533-1.21.364-1.17-.417-2.343-.878-3.442-1.823a9.75 9.75 0 0 1-1.823-3.442c-.169-.441-.012-.928.364-1.21l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg> {/* Phone icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg> {/* Dots icon */}
            <span className="font-semibold text-gray-800">ROSELINE BALOGUN</span>
            <span className="text-gray-500">Teacher</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
          </div>
        </header>

        <div className="p-4 bg-gray-100 min-h-screen">
          {/* My Student heading - only present in the first image, removed from second */}
          {/* <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">My Student</h1>
          </div> */}

          {/* Student and Session Information */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold">My Student</h2> {/* Re-added here to match image's layout after header */}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold">Name: JOY JAMES</div>
              <div className="text-lg font-bold">Basic Four white | 1st Term | 2024/2025 Session</div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="p-3 border">S/No</th>
                    <th className="p-3 border">Subjects</th>
                    <th className="p-3 border">Projects</th>
                    <th className="p-3 border">Note</th>
                    <th className="p-3 border">Home Work</th>
                    <th className="p-3 border">CA</th>
                    <th className="p-3 border">Exam</th>
                    <th className="p-3 border">Total</th>
                    <th className="p-3 border">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((item, index) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="p-3 border">{index + 1}</td>
                      <td className="p-3 border">{item.subject}</td>
                      <td className="p-3 border">{item.projects}</td>
                      <td className="p-3 border">{item.note}</td>
                      <td className="p-3 border">{item.homeWork}</td>
                      <td className="p-3 border">{item.ca}</td>
                      <td className="p-3 border">{item.exam}</td>
                      <td className="p-3 border">{item.total}</td>
                      <td className="p-3 border">{item.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary and Comments Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Position:</span> Not Yet calculated
                </p>
                <label htmlFor="dropdown-comment" className="block text-sm font-semibold mb-1">
                  Dropdown comment
                </label>
                <select
                  id="dropdown-comment"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedComment}
                  onChange={(e) => setSelectedComment(e.target.value)}
                >
                  <option value="">Choose dropwon comment</option>
                  <option value="Good Result, keep it up">Good Result, keep it up</option>
                  <option value="Fair Result, you need to improve">Fair Result, you need to improve</option>
                  <option value="Poor result, you need to sit up">Poor result, you need to sit up</option>
                </select>

                <label htmlFor="enter-comment" className="block text-sm font-semibold mt-4 mb-1">
                  Enter Comment
                </label>
                <Input
                  id="enter-comment"
                  placeholder=""
                  className="w-full"
                  value={enteredComment}
                  onChange={(e) => setEnteredComment(e.target.value)}
                  readOnly // To match the image, this is pre-filled
                />
              </div>

              <div>
                <p className="mb-2">
                  <span className="font-semibold">Total Score:</span> {totalScore}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Average score:</span> {averageScore}
                </p>

                {/* Attendance Section */}
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="school-opened" className="block text-sm font-semibold mb-1">
                        Time School Opened
                      </label>
                      <Input id="school-opened" value="108" readOnly />
                    </div>
                    <div>
                      <label htmlFor="time-present" className="block text-sm font-semibold mb-1">
                        Time Present
                      </label>
                      <Input id="time-present" value="108" readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insert Button */}
            <div className="mt-8 flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
                Insert
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
