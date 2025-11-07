"use client";

import TeacherLayouts from "@/components/layouts/teacher";
import StaffBirthday from "@/components/shared/staffBirthday";
import StudentBirthday from "@/components/shared/studentBirthday";
import { useAuth } from "@/hooks/use-auth";
import { useDashboard } from "@/hooks/use-user";
import { CircleUser, Eye, Logs } from "lucide-react";
import Image from "next/image";

// import { useEffect, useState } from "react";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();

  // console.log(data);

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

  return (
    <TeacherLayouts page="Dashboard">
      <div className="flex flex-1 bg-gray-100 flex-col gap-4 p-4">
        <div className="bg-[#4D2499] flex flex-col-reverse  md:flex-row items-center justify-between gap-5 p-6 rounded-xl text-white">
          <div className="flex flex-col gap-2">
            {user?.name && (
              <h2 className="md:text-3xl font-bold">Hello, {user?.name}</h2>
            )}

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-1 text-purple-200">
                <CircleUser className="text-current" />
                <span className="text-sm">
                  Teacher number: {data?.total_teachers}
                </span>
              </div>
              <div className="flex items-center gap-1 text-purple-200">
                <Eye />
                <span className="text-sm ">
                  Class: {data?.assigned_class?.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-purple-200">
                <Logs />
                <span className="text-sm ">Subjects</span>
              </div>
            </div>
          </div>
          <div className="md:ml-auto">
            <Image
              src="/img4.png"
              width={200}
              height={200}
              alt=""
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
          <StaffBirthday
            staffs={data?.celebrants?.staffs}
            isLoading={isLoading}
          />
          <StudentBirthday
            students={data?.celebrants?.students}
            isLoading={isLoading}
          />
        </div>
      </div>
    </TeacherLayouts>
  );
}
