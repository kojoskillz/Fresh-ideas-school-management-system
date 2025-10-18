"use client";

import { useEffect, useState } from "react";
import TeacherLayouts from "@/components/layouts/teacher";
import ProfileUploader from "@/components/shared/profileUploader";
import { useAuth } from "@/hooks/use-auth";
import ProfileDetails from "@/components/teacher/profile/profileDetails";
import { User } from "@/types/user";
import TeacherProfileTabs from "@/components/teacher/profile/tabs";

export default function Page() {
  const { user, isLoading } = useAuth();

  return (
    <TeacherLayouts page="Profile">
      <div className="p-5">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          <div className="bg-white py-10 px-6 rounded-xl shadow-sm flex flex-col">
            <ProfileUploader user={user} />
            <ProfileDetails user={user as User} isLoading={isLoading} />
          </div>

          <div className="rounded-md bg-white md:col-span-2 p-4 h-full shadow-sm">
            <TeacherProfileTabs user={user as User} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </TeacherLayouts>
  );
}
