import { Skeleton } from "@/components/ui/skeleton";
import { TeacherProfile } from "@/types/teacher";
import { User } from "@/types/user";
import React from "react";
import { StudentProfile } from "@/types/student";
import { formatDate } from "@/lib/utils";

export default function ProfileDetails({
  user,
  isLoading,
}: {
  user: User;
  isLoading: boolean;
}) {
  console.log(user);
  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">{user?.name}</h2>

      <div className="w-full text-gray-700 text-sm flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <strong>Email: </strong>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span> {user?.email}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <strong>Phone number: </strong>
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{user?.phone}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <strong>Date of birth: </strong>{" "}
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{formatDate(user?.date_of_birth)}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <strong>Gender: </strong>{" "}
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{user?.gender}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <strong>Class: </strong>{" "}
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span> {(user?.profile as StudentProfile)?.class.name}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <strong>Address: </strong>{" "}
          {isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <span>{user?.address}</span>
          )}
        </div>
      </div>
    </div>
  );
}
