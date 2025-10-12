"use client";

import { AdminProfile } from "@/types/admin";
import { User } from "@/types/user";
import { Skeleton } from "@mui/material";

export default function ProfileDetails({
  isLoading,
  user,
}: {
  isLoading: boolean;
  user: User;
}) {

  return (
    <div className="px-4 w-full">
      <h1 className="text-center font-semibold">{user?.name}</h1>

      <ol className="mt-5 space-y-4 text-sm">
        <li className="flex gap-2">
          <span className="font-semibold">Religion:</span>
          {isLoading ? (
            <Skeleton />
          ) : !isLoading && user?.religion ? (
            <p className="text-primary/55">{user?.religion}</p>
          ) : (
            <span className="text-primary/55">Not provided</span>
          )}
        </li>

        <li className="flex gap-2">
          <span className="font-semibold">Position:</span>
          {isLoading ? (
            <Skeleton />
          ) : !isLoading && (user?.profile as AdminProfile)?.position ? (
            <p className="text-primary/55">
              {(user?.profile as AdminProfile)?.position}
            </p>
          ) : (
            <span className="text-primary/55">Not provided</span>
          )}
        </li>

        <li className="flex gap-2">
          <span className="font-semibold">Category:</span>
          <span className="text-primary/55">Day</span>
        </li>

        <div className="flex gap-2">
          <span className="font-semibold">Address:</span>
          {isLoading ? (
            <Skeleton />
          ) : !isLoading && user?.address ? (
            <p className="text-primary/55">{user?.address}</p>
          ) : (
            <span className="text-primary/55">Not provided</span>
          )}
        </div>
      </ol>
    </div>
  );
}
