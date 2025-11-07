"use client";

import { User } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { formatDate } from "@/lib/utils";
import { StudentProfile } from "@/types/student";

export default function AboutTab({
  isLoading,
  user,
}: {
  isLoading: boolean;
  user: User;
}) {
  return (
    <div>
      <div className="mt-5">
        <p className="mb-5">Personal Profile</p>
        <p className="text-sm">
          Below is the personal profile of information of the student. All you
          need to know about the student (address,phone number,parents name etc)
        </p>
      </div>

      <div className="grid md:grid-cols-2 mt-7 gap-4 relative text-sm lg:text-base">
        <ol className="space-y-4 relative">
          <div className="hidden md:block bg-primary/30 absolute top-2 left-1.5 bottom-5 w-[1px]" />
          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold text-sm">Fullname:</p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && user?.name ? (
                <p className="text-primary/55">{user?.name}</p>
              ) : (
                <p className="text-primary/55">Not provided</p>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
            <div>
              <p className="font-semibold">Date of Birth:</p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && user?.date_of_birth ? (
                <p className="text-primary/55">
                  {formatDate(user?.date_of_birth)}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10"></div>
            <div>
              <p className="font-semibold">Phone number:</p>

              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && user?.phone ? (
                <p className="text-primary/55">{user?.phone}</p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Gender:</p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && user?.gender ? (
                <p className="text-primary/55">{user?.gender}</p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Religion:</p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && user?.religion ? (
                <p className="text-primary/55">{user?.religion}</p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>
        </ol>
        <ol className="space-y-4 relative">
          <div className="hidden md:block bg-primary/30 absolute top-2 left-1.5 bottom-4 w-[1px]" />

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Class:</p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && (user?.profile as StudentProfile)?.class ? (
                <p className="text-primary/55">
                  {(user?.profile as StudentProfile)?.class.name}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Father: </p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && (user?.profile as StudentProfile)?.father ? (
                <p className="text-primary/55">
                  {(user?.profile as StudentProfile)?.father}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Father phone number:</p>

              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading &&
                (user?.profile as StudentProfile)?.father_phone ? (
                <p className="text-primary/55">
                  {(user?.profile as StudentProfile)?.father_phone}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>
          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Mother: </p>
              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading && (user?.profile as StudentProfile)?.mother ? (
                <p className="text-primary/55">
                  {(user?.profile as StudentProfile)?.mother}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>

          <li className="flex gap-4">
            <div className="w-3 h-3 translate-y-1 bg-[#6C75F0] rounded-full z-10" />
            <div>
              <p className="font-semibold">Mother phone number:</p>

              {isLoading ? (
                <Skeleton className="h-6 w-32" />
              ) : !isLoading &&
                (user?.profile as StudentProfile)?.mother_phone ? (
                <p className="text-primary/55">
                  {(user?.profile as StudentProfile)?.mother_phone}
                </p>
              ) : (
                <span className="text-primary/55">Not provided</span>
              )}
            </div>
          </li>
        </ol>
        <div className="bg-primary/30 absolute top-2 left-1.5 bottom-6 w-[1px] z-0 md:hidden" />
      </div>
    </div>
  );
}
