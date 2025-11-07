"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TeacherSidebar from "./teacher_sidebar";
import BaseHeader from "../baseheader";

interface AdminLayoutProps {
  children: React.ReactNode;
  page: string;
}

export default function TeacherLayouts({ children, page }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      {/* <AdminSidebar collapsible="offcanvas" page={page} /> */}
      <TeacherSidebar page={page} />

      <SidebarInset className="bg-primary-foreground w-full">
        {/* <AdminHeader header={page} /> */}
        <BaseHeader header={page} section="Teacher" />
        <main className="font-inter w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
