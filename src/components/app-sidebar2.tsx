import * as React from "react";
import {
  LayoutDashboard,
  User,
  BookOpen,
  Trophy,
  LogOut,
} from "lucide-react"; // ✅ Import Lucide icons

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sidebar data with icon components
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "./dashboard",
          icon: <LayoutDashboard size={18} />, // Lucide icon
          isActive: false,
        },
        {
          title: "Profile",
          url: "./profile",
          icon: <User size={18} />,
          isActive: false,
        },
        {
          title: "Subjects",
          url: "./subject",
          icon: <BookOpen size={18} />,
          isActive: false,
        },
        {
          title: "Results",
          url: "./results",
          icon: <Trophy size={18} />,
          isActive: false,
        },
        {
          title: "Sign Out",
          url: "/",
          icon: <LogOut size={18} />,
          isActive: false,
        },
      ],
    },
  ],
};
export function AppSidebar2({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a
                        href={item.url}
                        className="flex items-center gap-2"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
             {/* Student Portal image at the bottom */}
      <div className="flex flex-col items-center justify-center p-4">
        <img
          src="/img1.png" // Place this image in /public folder or update path
          alt="Student Portal"
          className="w-32 h-32 mt-16 object-contain bg-indigo-500 rounded-full"
        />
        <p className="text-sm font-semibold mt-2">Student Portal</p>
      </div>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
