"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import AdminHeader from "./admin-header";

interface AdminLayoutProps {
  children: React.ReactNode;
  page: string;
  showSearch?: boolean;
}

export default function AdminLayout({
  children,
  page,
  showSearch = false,
}: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar collapsible="offcanvas" page={page} />
      <SidebarInset className="bg-primary-foreground w-full">
        <AdminHeader header={page} showSearch={showSearch as boolean} />
        <main className="font-inter w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
