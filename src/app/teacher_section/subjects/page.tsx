"use client";

import { useEffect, useState } from "react";
import TeacherLayouts from "@/components/layouts/teacher";
// import { Input } from "@/components/ui/input";

export default function Page() {
  // Keep state for user name for the header
  const [name, setName] = useState("");
  // schoolname is not used in this layout, keeping it as per previous code
  const [schoolname, setSchoolName] = useState("");

  // State for search input (optional, but good for functionality)
  const [searchTerm, setSearchTerm] = useState("");
  // State for "Show X entries" (optional)
  const [entriesToShow, setEntriesToShow] = useState(50);

  // Fetch user name from localStorage for the header
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
 
  }, []);

  // Placeholder student data based on the screenshot
  const students = [
    { id: 1, name: "Joy" },
    { id: 2, name: "Amaka" },
    { id: 3, name: "James" },
    { id: 4, name: "Florence" },
    { id: 5, name: "Joy" },
    { id: 6, name: "Amaka" },
    { id: 7, name: "James" },
    { id: 8, name: "Florence" },
    { id: 9, name: "Joy" },
    { id: 10, name: "Amaka" },
    { id: 11, name: "James" },
    { id: 12, name: "Florence" },
    { id: 13, name: "Joy" },
    { id: 14, name: "Amaka" },
    { id: 15, name: "James" },
    { id: 16, name: "Florence" },
    { id: 17, name: "Joy" },
    { id: 18, name: "Amaka" },
    // Add more student data as needed
  ];

  return (
    <TeacherLayouts page="Subjects">
      <div className="flex flex-1 bg-gray-100 flex-col gap-4 p-4">
        {/* My Students Heading and Controls */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">My Students</h1>
          {/* "Show X entries" control */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Show
            <select
              title="entries to show"
              value={entriesToShow}
              onChange={(e) => setEntriesToShow(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            entries
          </div>
        </div>

        {/* Full Name Label (as seen in screenshot, though context is unclear) */}
        {/* Keeping it as a label for now */}
        <div className="text-sm text-gray-600 mb-2">Full Name:</div>

        {/* Student Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          {" "}
          {/* Add overflow for responsiveness */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-4">S/No</th>
                <th className="p-4">Names</th>
                <th className="p-4">Profile</th>
                <th className="p-4">Teacher&lsquo;s comment</th>
                <th className="p-4">Head Teacher&lsquo;s comment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="p-4">{index + 1}</td> {/* S/No */}
                  <td className="p-4">{student.name}</td> {/* Names */}
                  <td className="p-4">
                    {/* Profile Button */}
                    <button className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>{" "}
                      {/* Check icon */}
                      Profile
                    </button>
                  </td>
                  <td className="p-4">
                    {/* Input Comment Button */}
                    <button className="px-3 py-1 bg-pink-500 text-white text-xs font-semibold rounded-md hover:bg-pink-600 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>{" "}
                      {/* Pencil/Edit icon */}
                      Input Comment
                    </button>
                  </td>
                  <td className="p-4 text-gray-500">No comment</td>{" "}
                  {/* Head Teacher's comment */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          {/* Placeholder text - you might want to show actual count */}
          <div>
            Showing 1 to {students.length} of {students.length} entries
          </div>{" "}
          {/* Example: adjust based on pagination logic */}
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">
              Previous
            </button>
            <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded-md">
              1
            </button>{" "}
            {/* Active page */}
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </TeacherLayouts>
  );
}
