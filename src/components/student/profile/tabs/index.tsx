"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AboutTab from "./AboutTab";
import { User } from "@/types/user";
import EditProfileForm from "./EditStudentProfileForm";

export default function TeacherProfileTabs({
  isLoading,
  user,
}: {
  isLoading: boolean;
  user: User;
}) {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className=" gap-4 w-full grid-cols-2 bg-transparent">
        <TabsTrigger
          value="about"
          className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-secondary/10"
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="edit"
          className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-secondary/10"
        >
          Edit Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="about">
        <AboutTab isLoading={isLoading} user={user} />
      </TabsContent>
      <TabsContent value="edit">
        <EditProfileForm user={user} />
      </TabsContent>
    </Tabs>
  );
}
