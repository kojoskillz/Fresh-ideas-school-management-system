"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TeacherLayouts from "@/components/layouts/teacher";

export default function SubjectTablePage() {
  // Enhanced data structure to match the image's content
  const subjects = [
    {
      id: 1,
      subject: "English Language",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 2,
      subject: "Mathematics",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "C",
    },
    {
      id: 3,
      subject: "Science",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "B",
    },
    {
      id: 4,
      subject: "Social Studies",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "B",
    },
    {
      id: 5,
      subject: "Health Education",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 6,
      subject: "Civic Education",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 7,
      subject: "Religion",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 8,
      subject: "French",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 9,
      subject: "Music",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 10,
      subject: "Phonics/Diction",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 11,
      subject: "Agricultural Science",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 12,
      subject: "Computer Studies/ICT",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 13,
      subject: "Home Economics",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 14,
      subject: "Yoruba Language",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 15,
      subject: "Spellings",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 16,
      subject: "History",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
    {
      id: 17,
      subject: "Vocational",
      projects: 10,
      note: 5,
      homeWork: 5,
      ca: 18,
      exam: 55,
      total: 93,
      grade: "A",
    },
  ];

  // Calculate Total Score and Average Score dynamically (example)
  const totalScore = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = (totalScore / subjects.length).toFixed(2); // To 2 decimal places

  const [selectedComment, setSelectedComment] = useState(""); // State for dropdown
  const [enteredComment, setEnteredComment] = useState(
    "An excellent performance, keep it up"
  ); // State for text input

  return (
    <TeacherLayouts page="Add Comment">
      <div className="p-4 bg-gray-100 min-h-screen">
        {/* My Student heading - only present in the first image, removed from second */}
        {/* <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">My Student</h1>
          </div> */}

        {/* Student and Session Information */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">My Student</h2>{" "}
            {/* Re-added here to match image's layout after header */}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">Name: JOY JAMES</div>
            <div className="text-lg font-bold">
              Basic Four white | 1st Term | 2024/2025 Session
            </div>
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
                <span className="font-semibold">Position:</span> Not Yet
                calculated
              </p>
              <label
                htmlFor="dropdown-comment"
                className="block text-sm font-semibold mb-1"
              >
                Dropdown comment
              </label>
              <select
                id="dropdown-comment"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedComment}
                onChange={(e) => setSelectedComment(e.target.value)}
              >
                <option value="">Choose dropwon comment</option>
                <option value="Good Result, keep it up">
                  Good Result, keep it up
                </option>
                <option value="Fair Result, you need to improve">
                  Fair Result, you need to improve
                </option>
                <option value="Poor result, you need to sit up">
                  Poor result, you need to sit up
                </option>
              </select>

              <label
                htmlFor="enter-comment"
                className="block text-sm font-semibold mt-4 mb-1"
              >
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
                <span className="font-semibold">Average score:</span>{" "}
                {averageScore}
              </p>

              {/* Attendance Section */}
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="school-opened"
                      className="block text-sm font-semibold mb-1"
                    >
                      Time School Opened
                    </label>
                    <Input id="school-opened" value="108" readOnly />
                  </div>
                  <div>
                    <label
                      htmlFor="time-present"
                      className="block text-sm font-semibold mb-1"
                    >
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
    </TeacherLayouts>
  );
}
