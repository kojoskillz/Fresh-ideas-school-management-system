"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import AdminHeader from "../baseheader";

interface AdminLayoutProps {
  children: React.ReactNode;
  page: string;
}

export default function AdminLayout({ children, page }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar  page={page} />
      <SidebarInset className="bg-primary-foreground w-full">
        <AdminHeader header={page} section="Admin"/>
        <main className="font-inter w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
