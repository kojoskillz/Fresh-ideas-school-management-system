"use client";

import Image from "next/image";
import StudentLayout from "@/components/layouts/student";
import { useDashboard } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { StudentProfile } from "@/types/student";
import {
  SubjectsDashboardIcon,
  ProfileDashboardIcon,
} from "@/components/svgs/NavbarSvg";
import StudentBirthday from "@/components/shared/studentBirthday";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeacherProfile } from "@/types/teacher";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useDashboard();
  const { user } = useAuth();

  return (
    <StudentLayout page="Dashboard">
      <div className="flex flex-1  flex-col gap-4 p-4 h-full">
        {/* Green Banner Section */}
        <div className="bg-[#58BAAB] text-white rounded-xl p-4 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-4">
            {user && (
              <div className="text-center md:text-start">
                <h2 className="text-lg md:text-2xl font-bold">
                  HELLO, {user?.name.toUpperCase()}
                </h2>
                <p className="text-sm md:text-base font-semibold text-white/70">
                  Student Admission No:{" "}
                  {(user?.profile as StudentProfile)?.admission_number}
                </p>
              </div>
            )}
            <div className="flex gap-4">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="bg-[#F2426D] p-3 md:p-5 rounded-full">
                  <SubjectsDashboardIcon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div>
                  <h5 className="font-semibold">Class: </h5>
                  <p className="font-semibold text-white/70 text-sm">
                    {(user?.profile as StudentProfile)?.class?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="bg-[#FFF033] p-3 md:p-5 rounded-full">
                  <ProfileDashboardIcon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div>
                  <h5 className="font-semibold">Subjects:</h5>
                  <p className="font-semibold text-white/70 text-sm">17</p>
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/img4.png"
            width={200}
            height={200}
            alt="Student Illustration"
            className="object-contain"
          />
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h1 className="mb-4 text-xl text-primary font-semibold">
              Teachers
            </h1>
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <Loader2 className="animate-spin text-primary/55 mx-auto mt-10" />
              ) : (
                data?.teachers?.map((teacher: Partial<TeacherProfile>) => (
                  <div
                    key={teacher?._id}
                    className="flex gap-2 items-center py-1"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={teacher?.user?.img_url} />
                      <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
                        <ProfileDashboardIcon />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base text-black font-medium leading-3">
                        {teacher?.user?.name}
                      </p>
                      <p className="text-sm text-black opacity-50 font-medium ">
                        English Language
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <StudentBirthday
            students={data?.celebrants?.students}
            isLoading={isLoading}
          />
        </div>
      </div>
    </StudentLayout>
  );
}
