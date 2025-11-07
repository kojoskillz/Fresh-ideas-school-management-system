"use client";

import StudentLayout from "@/components/layouts/student";
import ProfileUploader from "@/components/shared/profileUploader";
import { useAuth } from "@/hooks/use-auth";
import ProfileDetails from "@/components/student/profile/profileDetails";
import { User } from "@/types/user";
import StudentProfileTabs from "@/components/student/profile/tabs";

export default function Page() {
  const { user, isLoading } = useAuth();

  return (
    <StudentLayout page="Profile">
      <div className="p-5">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white py-10 px-6 rounded-xl shadow-sm flex flex-col">
            <ProfileUploader user={user} />
            <ProfileDetails user={user as User} isLoading={isLoading} />
          </div>

          <div className="rounded-md bg-white md:col-span-2 p-4 h-full shadow-sm">
            <StudentProfileTabs user={user as User} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
