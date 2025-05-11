"use client";
import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AdminHeader from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
  page: string;
  header?: string;
}

export default function AdminLayout({
  children,
  page,
  header,
}: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar page={page} />
      <SidebarInset className=" bg-primary-foreground">
        <AdminHeader header={header} />
        <div className="font-inter">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
