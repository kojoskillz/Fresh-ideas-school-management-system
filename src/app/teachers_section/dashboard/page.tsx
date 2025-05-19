/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { AppSidebar1 } from "@/components/app-sidebar1"; // Assuming this component exists
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
} from "@/components/ui/sidebar"; // Assuming these components exist

export default function Page() {
  const [userName, setUserName] = useState("");
  const [teacherDetails, setTeacherDetails] = useState({ id: '12345', class: 'Form 5' });

  // Fetch user name from localStorage9
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // The second useEffect was overwriting `name`.
  // Based on the image, we only need the user name for the greeting.
  // Removed the schoolName effect as it's not used in the greeting banner in the image.
  // If schoolName is needed elsewhere, you would keep a separate state and effect for it.

  // Placeholder data for the new cards based on the image
  const subjectsAssigned = [
    "Subject 1",
    "Subject 2",
    "Subject 3",
    "Subject 4",
    "Subject 5",
    "Subject 6",
    "Subject 7",
    "Subject 8",
    "Subject 9",
    "Subject 10",
  ];

  const staffBirthdays = [
    "Mr colleague's birthday today", // Placeholder
  ];

  const studentBirthdays = [
    "Jone Smith", // Placeholder
    "Florence John", // Placeholder
  ];


  return (
    <SidebarProvider>
      {/* Assuming AppSidebar1 matches the sidebar in the image */}
      <AppSidebar1 />
      <SidebarInset>
        {/* Header/Breadcrumb */}
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
                <BreadcrumbPage>Teachers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

             <div className="ml-auto flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg> {/* Moon/Sun icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg> {/* Menu icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg> {/* User icon placeholder */}
                 <span className="text-sm text-gray-700">{userName || "teacher's name"}</span> {/* Use the `name` state */}
           </div>
        </header>

        {/* Main Content Area */}
        {/* Changed background to a lighter gray */}
        <div className="flex flex-1 bg-gray-100 flex-col gap-4 p-4">
          {/* Purple Banner Section */}
          <div className="bg-[#4D2499] flex items-center justify-between p-6 rounded-xl text-white">
            {/* Left side content */}
            <div className="flex flex-col gap-2">
              {/* Welcome message */}
              {userName && (
                <h2 className="text-4xl font-bold">HELLO {userName.toUpperCase()}</h2>
              )}
              {/* Teacher details */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-purple-200">Teacher number: {teacherDetails.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-purple-200">{teacherDetails.class} Class</span>
                </div>
                <div className="flex items-center gap-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zm0 4a1 1 0 000 2h11a1 1 0 100-2H3zm0 4a1 1 0 100 2h7a1 1 0 100-2H3zm0 4a1 1 0 100 2h7a1 1 0 100-2H3z" clipRule="evenodd" />
                    </svg>
                  <span className="text-sm text-purple-200">Subjects</span>
                </div>
              </div>
            </div>

            {/* Right side image */}
            {/* Removed absolute positioning and placed it within the flex container */}
            <div className="ml-auto">
              <Image
                src="/img4.png" // Use the correct image source
                width={200}
                height={200}
                alt=""
                className="object-contain"
              />
            </div>
          </div>

          {/* Cards Section */}
          {/* Changed grid layout to match the image (3 columns) */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {/* Subjects assigned card */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h1 className="mb-4 text-xl text-gray-700 font-semibold">
                Subjects assigned
              </h1>
              <ul className="list-disc list-inside text-gray-600">
                {subjectsAssigned.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>

            {/* Staff Birthday card */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl text-gray-700 font-semibold">
                        Staff Birthday
                    </h1>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 10h10v5H5v-5zm0-2h10V4H5v6z" clipRule="evenodd" />
                      <path d="M8 11h.01V11a1 1 0 10-.01 0zm3 0h.01V11a1 1 0 10-.01 0zM8 14h.01V14a1 1 0 10-.01 0zm3 0h.01V14a1 1 0 10-.01 0z" />
                    </svg>
                </div>
                {staffBirthdays.map((event, index) => (
                    <p key={index} className="text-gray-600">{event}</p>
                ))}
                 {/* Add more space if needed for longer lists */}
                <div className="flex-grow"></div> {/* Pushes content up */}
            </div>


            {/* Students Birthday card */}
             <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl text-gray-700 font-semibold">
                        Students Birthday
                    </h1>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H5zm0 10h10v5H5v-5zm0-2h10V4H5v6z" clipRule="evenodd" />
                      <path d="M8 11h.01V11a1 1 0 10-.01 0zm3 0h.01V11a1 1 0 10-.01 0zM8 14h.01V14a1 1 0 10-.01 0zm3 0h.01V14a1 1 0 10-.01 0z" />
                    </svg>
                </div>
                 <ul className="list-disc list-inside text-gray-600">
                  {studentBirthdays.map((student, index) => (
                    <li key={index}>{student}</li>
                  ))}
                </ul>
                 {/* Add more space if needed for longer lists */}
                 <div className="flex-grow"></div> {/* Pushes content up */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
