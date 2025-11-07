"use client";

import Image from "next/image";

import AdminLayout from "../../../components/layouts/admin";
import CurvedSvg from "@/components/svgs/CurvedSvg";
import { useAuth } from "@/hooks/use-auth";
import { AdminProfile } from "@/types/admin";
import { useDashboard } from "@/hooks/use-user";
import StaffBirthday from "@/components/shared/staffBirthday";
import StudentBirthday from "@/components/shared/studentBirthday";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading} = useDashboard();

  console.log(user)

  return (
    <AdminLayout page="Dashboard">
      <div className="flex bg-primary-foreground flex-col gap-4 p-4 h-full">
        <div className="bg-[#A926C7] p-5 md:p-10 flex flex-col sm:flex-row justify-between gap-6 rounded-xl">
          <div className="">
            {user?.name && (
              <h2 className="text-lg font-bold text-white">
                Hello, {user?.name}
              </h2>
            )}
            <span className="text-sm font-semibold text-white">
              {(user?.profile as AdminProfile)?.position}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="max-w-[150px]">
              <CurvedSvg />
            </div>
            <div className="relative w-full max-w-[130px] h-[100px]">
              <Image
                src="/img4.png"
                width={130}
                height={100}
                alt="students illustration"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-white aspect-vide rounded-xl h-full p-4">
            <h1 className="text-xl text-primary font-semibold mb-4">
              Sections
            </h1>
            <div>
              <ul className="">
                {[
                  "Basic 1",
                  "Basic 2",
                  "Basic 3",
                  "Basic 4",
                  "Basic 5",
                  "Basic 6",
                ].map((item) => (
                  <li className="text-gray-600 py-1" key={item}>
                    {" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
    </AdminLayout>
  );
}
