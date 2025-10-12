"use client";

import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layouts/admin";
import ProfileTabs from "@/components/admin/profile/tabs";
import ProfileUploader from "@/components/shared/profileUploader";
import ProfileDetails from "@/components/admin/profile/profileDetails";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/user";

export default function Page() {
  const { user, isLoading } = useAuth();

  useQueryClient().invalidateQueries({
    queryKey: ["Authenticated User"],
  });

  return (
    <AdminLayout page="Profile">
      <div className="p-5">
        <div className="grid md:grid-cols-3 gap-5 items-start">
          <div className=" rounded-md bg-white flex flex-col items-center py-10">
            <ProfileUploader user={user} />
            <ProfileDetails user={user as User} isLoading={isLoading} />
          </div>
          <div className="rounded-md bg-white md:col-span-2 p-4 h-full">
            <ProfileTabs isLoading={isLoading} user={user as User} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
