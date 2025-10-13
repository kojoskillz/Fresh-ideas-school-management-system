"use client";

import { useEffect, useState } from "react";
import TeacherLayouts from "@/components/layouts/teacher";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const [selectedSession] = useState("2024/2025");
  const [selectedTerm] = useState("3rd");
  const { setShowSearch } = useAuth();
  const students = [
    { id: 1, admissionNo: "10001", name: "Joy" },
    { id: 2, admissionNo: "10002", name: "James" },
    { id: 3, admissionNo: "10003", name: "Maria" },
    { id: 4, admissionNo: "10004", name: "Prince" },
    { id: 5, admissionNo: "10005", name: "Pretla" },
  ];

  const subjects = [
    "English",
    "Mathematics",
    "Science",
    "Social Studies",
    "Religion",
    "Health Education",
    "Computer/ICT",
    "French",
    "Phonics",
    "Spelling",
    "Home Economics",
    "Aptitude Test",
    "Music",
    "Creative Art",
    "Yoruba",
    "Agricultural Science",
  ];

  // Example static scores (since we're in view-only mode)
  const scores: { [key: number]: { [key: string]: number } } = {
    1: { English: 80, Mathematics: 75 },
    2: { English: 65, Mathematics: 70 },
    3: { English: 90, Mathematics: 85 },
    4: { English: 50, Mathematics: 60 },
    5: { English: 95, Mathematics: 88 },
  };

  useEffect(() => {
    setShowSearch(true);
  }, []);
  return (
    <TeacherLayouts page="Quick Class Results">
      <div className="flex flex-1 min-h-screen bg-gray-100 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-gray-800">
            My Result - ENGLISH LANGUAGE Basic Four White
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Session:</span>
              <span>{selectedSession}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Term:</span>
              <span>{selectedTerm}</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="p-2 min-w-[50px]">S/No</th>
                <th className="p-2 min-w-[80px]">Admission No</th>
                <th className="p-2 min-w-[150px]">Name</th>
                {subjects.map((subject) => (
                  <th key={subject} className="p-2 min-w-[100px]">
                    {subject}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{student.admissionNo}</td>
                  <td className="p-2">{student.name}</td>
                  {subjects.map((subject) => (
                    <td key={subject + student.id} className="p-2 text-center">
                      {scores[student.id as keyof typeof scores]?.[subject] ??
                        "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
          Showing 1 - {students.length} of {students.length} entries
        </div>
      </div>
    </TeacherLayouts>
  );
}
