"use client";

import Image from "next/image"; // Keep Image import for placeholders or future use
import { useEffect, useState } from "react";
import { AppSidebar2 } from "@/components/app-sidebar2";
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

export default function Page() {
  const [userName, setUserName] = useState(""); // Renamed 'name' to 'userName' for clarity
  const [schoolName, setSchoolName] = useState(""); // Renamed 'schoolname' to 'schoolName' for clarity

  // Effect to load user name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Effect to load school name from localStorage (fixed to set schoolName)
  useEffect(() => {
    const storedSchoolName = localStorage.getItem("schoolName");
    if (storedSchoolName) {
      setSchoolName(storedSchoolName); // Corrected this line to set schoolName
    }
  }, []);

  // Placeholder data for teachers and students
  const teachers = [
    { name: "Mrs. Joy James", subject: "English Language" },
    { name: "Mr. Patrick Prince", subject: "Mathematics" },
    { name: "Miss Prisca Ayo", subject: "Social Studies" },
    { name: "Mrs. Balogun Saint", subject: "Science" },
    { name: "Mr. James Okon", subject: "Health Education" },
  ];

  const studentsBirthday = [
    { name: "Jane Smith" },
    { name: "Florence John" },
  ];

  return (
    <SidebarProvider>
      <AppSidebar2 />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Admin</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 bg-gray-100 flex-col gap-4 p-4">
          {/* Green Banner Section */}
          <div className="bg-green-500 text-white rounded-xl p-5 flex flex-col md:flex-row items-center justify-between h-48 md:h-auto">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              {userName && (
                <h2 className="text-4xl font-bold">HELLO {userName.toUpperCase()}</h2>
              )}
              {/* You can choose to display schoolName here if desired, or keep it separate */}
              <p className="text-lg mt-1">Student Admission No: 10001</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="bg-white/30 rounded-full px-4 py-2 flex items-center gap-2 text-sm md:text-base">
                  <span className="text-xl">📚</span> Class: Basic 4 White
                </div>
                <div className="bg-white/30 rounded-full px-4 py-2 flex items-center gap-2 text-sm md:text-base">
                  <span className="text-xl">📖</span> Subjects: 17
                </div>
              </div>
            </div>
            {/* Placeholder for the student illustration from the reference image */}
            <Image
              src="/img4.png" // Update this path to your actual image
              width={200}
              height={150}
              alt="Student Illustration"
              className="object-contain mt-4 md:mt-0"
            />
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            {/* Teachers Statistics Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h1 className="text-xl text-gray-500 font-semibold mb-4">
                Teachers
              </h1>
              <div className="flex flex-col gap-3">
                {teachers.map((teacher, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">👤</span>
                    <div>
                      <p className="font-medium">{teacher.name}</p>
                      <p className="text-sm text-gray-500">{teacher.subject}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
                  View All
                </button>
              </div>
            </div>

            {/* Students Birthday Card */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h1 className="text-xl text-gray-500 font-semibold mb-4 flex items-center gap-2">
                Students Birthday <span className="text-2xl">🎂</span>
              </h1>
              <div className="flex flex-col gap-3">
                {studentsBirthday.map((student, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="text-xl">👶</span> {/* Placeholder icon */}
                    <p className="font-medium">{student.name}</p>
                  </div>
                ))}
              </div>
              {/* You can add a "View All" button here too if needed */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
