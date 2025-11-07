import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import StudentSideBar from "./student_sidebar";
import BaseHeader from "../baseheader";
import { ReactNode } from "react";

export default function index({
  children,
  page,
}: {
  children: ReactNode;
  page: string;
}) {
  return (
    <SidebarProvider>
      <StudentSideBar page={page} />
      <SidebarInset>
        <BaseHeader header={page} section="Student" />
        <main className="flex flex-col h-full bg-gray-100">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
