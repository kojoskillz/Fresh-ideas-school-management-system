"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StudentLayout from "@/components/layouts/student";

export default function SubjectTablePage() {
  // Simplified data structure to match the xme.png image
  const subjects = [
    {
      id: 1,
      teacher: "Teacher A",
      subject: "English Language",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 2,
      teacher: "Teacher B",
      subject: "Mathematics",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
    {
      id: 3,
      teacher: "Teacher C",
      subject: "Science",
      class: "Basic 4 white",
      term: 3,
      session: "2024/2025",
    },
    {
      id: 4,
      teacher: "Teacher D",
      subject: "Social Studies",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 5,
      teacher: "Teacher E",
      subject: "Health Education",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
    {
      id: 6,
      teacher: "Teacher F",
      subject: "Civic Education",
      class: "Basic 4 white",
      term: 3,
      session: "2024/2025",
    },
    {
      id: 7,
      teacher: "Teacher G",
      subject: "Religion",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 8,
      teacher: "Teacher H",
      subject: "French",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
    {
      id: 9,
      teacher: "Teacher I",
      subject: "Music",
      class: "Basic 4 white",
      term: 3,
      session: "2024/2025",
    },
    {
      id: 10,
      teacher: "Teacher J",
      subject: "Phonics/Diction",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 11,
      teacher: "Teacher K",
      subject: "Agricultural Science",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
    {
      id: 12,
      teacher: "Teacher L",
      subject: "Computer Studies/ICT",
      class: "Basic 4 white",
      term: 3,
      session: "2024/2025",
    },
    {
      id: 13,
      teacher: "Teacher M",
      subject: "Home Economics",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 14,
      teacher: "Teacher N",
      subject: "Yoruba Language",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
    {
      id: 15,
      teacher: "Teacher O",
      subject: "Spellings",
      class: "Basic 4 white",
      term: 3,
      session: "2024/2025",
    },
    {
      id: 16,
      teacher: "Teacher P",
      subject: "History",
      class: "Basic 4 white",
      term: 1,
      session: "2024/2025",
    },
    {
      id: 17,
      teacher: "Teacher Q",
      subject: "Vocational",
      class: "Basic 4 white",
      term: 2,
      session: "2024/2025",
    },
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
    <StudentLayout page="Subjects">
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
            <option value="17">17</option>{" "}
            {/* Matches the default in the image */}
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
                  <td className="p-3 border">
                    {indexOfFirstEntry + index + 1}
                  </td>
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
            Showing {indexOfFirstEntry + 1} to{" "}
            {Math.min(indexOfLastEntry, subjects.length)} of {subjects.length}{" "}
            entries
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
                className={
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }
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
    </StudentLayout>
  );
}
