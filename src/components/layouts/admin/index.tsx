"use client";

import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import AdminHeader from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
  page: string;
  header?: string | React.ReactNode;
}

export default function AdminLayout({
  children,
  page,
  header,
}: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar collapsible="offcanvas" page={page} />
      <SidebarInset className="bg-primary-foreground w-full">
        <AdminHeader header={header} />
        <main className="font-inter w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
