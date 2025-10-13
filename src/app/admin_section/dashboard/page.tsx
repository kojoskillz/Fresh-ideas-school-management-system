"use client";
import Image from "next/image";

import AdminLayout from "../../../components/layouts/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CurvedSvg from "@/components/svgs/CurvedSvg";
import { useAuth } from "@/hooks/use-auth";
import { AdminProfile } from "@/types/admin";
import { useDashboard } from "@/hooks/use-user";
import { getInitial } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();

  return (
    <AdminLayout page="Dashboard">
      <div className="flex bg-primary-foreground flex-col gap-4 p-4 h-full">
        <div className="bg-[#A926C7] p-5 md:p-10 flex flex-col sm:flex-row justify-between gap-6 rounded-xl">
          <div className="">
            <h2 className="text-lg font-bold text-white">
              HELLO, {user?.name}
            </h2>
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
                fill
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

          <div className=" bg-white aspect-vide rounded-xl h-full p-4">
            <div className="flex items-center justify-between">
              <h1 className="mb-4 text-xl text-primary font-semibold">
                Staff Birthday
              </h1>
              <Image
                src="/img2.png"
                width={50}
                height={50}
                alt="Birthday cake"
              />
            </div>
            <div className="flex">
              {isLoading ? (
                <Loader2 className="animate-spin text-primary/55 mx-auto mt-10" />
              ) : data?.celebrants?.staffs.length > 0 ? (
                data.celebrants.staffs.map((staff: any) => {
                  return (
                    <div
                      key={staff._id}
                      className="flex gap-2 items-center py-1"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={staff?.img_url} />
                        <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
                          {getInitial(staff?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">
                        {staff.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-gray-600">
                  No colleague&apos;s birthday today
                </span>
              )}
            </div>
          </div>

          <div className=" bg-white aspect-vide rounded-xl h-full p-4">
            <div className="flex justify-between items-center">
              <h1 className="mb-4 text-xl text-primary font-semibold">
                Students Birthday
              </h1>
              <Image
                src="/img2.png"
                width={50}
                height={50}
                alt="Birthday cake"
              />
            </div>
            <div className="space-y-2">
              {isLoading ? (
                <Loader2 className="animate-spin text-primary/55 mx-auto mt-10" />
              ) : data?.celebrants?.students.length > 0 ? (
                data.celebrants.students.map((student: any) => {
                  console.log(student.img_url);
                  return (
                    <div
                      key={student._id}
                      className="flex gap-2 items-center py-1"
                    >
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={student?.img_url} />
                        <AvatarFallback className="text-sm font-semibold bg-primary-foreground">
                          {getInitial(student?.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">
                        {student.name}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-gray-600">
                  No student&apos;s birthday today
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
