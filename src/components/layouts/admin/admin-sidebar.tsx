import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AdminDashboardIcon,
  ProfileDashboardIcon,
  SubjectsDashboardIcon,
  AddStudentDashboardIcon,
  ListDashboardIcon,
  ResultDashboardIcon,
  QuickResultDashboardIcon,
  SignoutDashboardIcon,
} from "@/components/svgs/NavbarSvg";

function AdminSidebar({
  page,
  ...props
}: { page?: string } & React.ComponentProps<typeof Sidebar>) {
  const navItems = [
    {
      title: "Dashboard",
      url: "./dashboard",
      isActive: page === "Admin",
      icon: <AdminDashboardIcon />,
    },
    {
      title: "Profile",
      url: "./profile",
      isActive: page === "Profile",
      icon: <ProfileDashboardIcon />,
    },
    {
      title: "Subjects",
      url: "./subjects",
      isActive: page === "Subjects",
      icon: <SubjectsDashboardIcon />,
    },
    {
      title: "Add Teacher",
      url: "./Add_Teacher",
      isActive: page === "Add Teacher",
      icon: <AddStudentDashboardIcon />,
    },
    {
      title: "Add Student",
      url: "./Add_Student",
      isActive: page === "Add Student",
      icon: <AddStudentDashboardIcon />,
    },
    {
      title: "List of Teachers",
      url: "./teachers",
      isActive: page === "Teachers",
      icon: <ListDashboardIcon />,
    },
    {
      title: "List of Students",
      url: "./students",
      isActive: page === "Students",
      icon: <ListDashboardIcon />,
    },
    {
      title: "Results",
      url: "./results",
      isActive: page === "Results",
      icon: <ResultDashboardIcon />,
    },
    {
      title: "Quick Class Results",
      url: "./quick_class_results",
      isActive: page === "Quick Class Results",
      icon: <QuickResultDashboardIcon />,
    },
    {
      title: "Sign Out",
      url: "./",
      icon: <SignoutDashboardIcon />,
    },
  ];

  function SidebarMenuButton({
    isActive,
    className,
    icon,
    title,
    ...props
  }: {
    isActive?: boolean;
    className?: string;
    icon?: React.ReactNode;
    title?: string;
  } & React.ComponentPropsWithoutRef<"button">) {
    return (
      <button
        className={cn(
          "px-6 py-2 rounded-md w-full text-left transition-colors flex items-center gap-4 cursor-pointer font-semibold",
          isActive
            ? "text-secondary font-semibold"
            : "hover:bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        {icon}{" "}
        <span
          style={{
            opacity: isActive ? 100 : 10,
          }}
        >
          {title}
        </span>
      </button>
    );
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="gap-4 flex items-center mt-5">
          <Image src="/logo.png" width={50} height={50} alt="Logo" />{" "}
          <span className="font-bold text-xl">Fresh Ideas</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-5">
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => {
              return (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      icon={item.icon}
                      isActive={item.isActive}
                      title={item.title}
                    />
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <div
          style={{
            height: 200,
            width: 200,
            backgroundColor: "#6B63AB",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 40,
          }}
          className="relative flex flex-col items-center rounded-full mx-auto justify-center gap-1"
        >
          <Image
            src={"/img1.png"}
            alt="student portal"
            height={120}
            width={120}
          />
          <strong>Student Portal</strong>
        </div>
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  );
}

export default AdminSidebar;
