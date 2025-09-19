"use client";

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
  SidebarRail,
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
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";
import { ChevronSvg } from "@/components/svgs/Chevron";
import { useAuth } from "@/hooks/use-auth";

function AdminSidebar({
  page,
  ...props
}: { page?: string; children?: [] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { logoutMutation } = useAuth();

  const toggleSubNav = (title: string) => {
    setOpenSubNav((prev) => (prev === title ? null : title));
  };

  const navItems = [
    {
      title: "Dashboard",
      url: "/admin_section/dashboard",
      isActive: page === "Dashboard",
      icon: <AdminDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Profile",
      url: "/admin_section/profile",
      isActive: page === "Profile",
      icon: <ProfileDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Subjects",
      url: "/admin_section/subjects/add",
      isActive: page === "Subjects",
      icon: <SubjectsDashboardIcon className="w-5 h-5" />,
      children: [
        {
          title: "Add Subject",
          url: "/admin_section/subjects/add",
          isActive: page === "Add Subject",
          icon: <Dot size={25} />,
        },
      ],
    },
    {
      title: "Add Teacher",
      url: "/admin_section/add_teacher",
      isActive: page === "Add Teacher",
      icon: <AddStudentDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Add Student",
      url: "/admin_section/add_student",
      isActive: page === "Add Student",
      icon: <AddStudentDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "List of Teachers",
      url: "/admin_section/teachers",
      isActive: page === "Teachers",
      icon: <ListDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "List of Students",
      url: "/admin_section/students",
      isActive: page === "Students",
      icon: <ListDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Results",
      url: "/admin_section/results",
      isActive: page === "Results",
      icon: <ResultDashboardIcon className="w-5 h-5" />,
      children: [
        {
          title: "Add Result",
          url: "/admin_section/results/add",
          isActive: page === "Add Result",
          icon: <Dot size={25} />,
        },
        {
          title: "View Result",
          url: "/admin_section/results/view",
          isActive: page === "View Result",
          icon: <Dot size={25} />,
        },
      ],
    },
    {
      title: "Quick Class Results",
      url: "/admin_section/quick_class_results",
      isActive: page === "Quick Class Results",
      icon: <QuickResultDashboardIcon className="w-5 h-5" />,
    },
  ];

  const [openSubNav, setOpenSubNav] = React.useState<string | null>(() => {
    const parentWithActiveChild = navItems.find((item) =>
      item.children?.some((child) => child.isActive)
    );
    return parentWithActiveChild?.title ?? null;
  });

  function SidebarMenuButton({
    isActive,
    className,
    icon,
    title,
    hasChildren,
    ...props
  }: {
    isActive?: boolean;
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    hasChildren?: boolean;
  } & React.ComponentPropsWithoutRef<"button">) {
    return (
      <button
        className={cn(
          "text-sm px-6 py-2 rounded-md w-full text-left transition-colors flex items-center gap-4 cursor-pointer font-semibold",
          isActive
            ? "text-secondary font-semibold"
            : "hover:bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        {icon}
        <span
          style={{
            opacity: isActive ? 100 : 10,
          }}
        >
          {title}
        </span>

        {hasChildren && (
          <ChevronSvg
            className={`size-3 ml-auto ${isActive ? "rotate-180" : "rotate-0"}`}
          />
        )}
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
              const hasChildren = !!item.children?.length;
              const isExpanded =
                openSubNav === item.title ||
                (hasChildren && pathname.startsWith(item.url));

              return (
                <SidebarMenuItem key={item.title}>
                  {hasChildren ? (
                    <SidebarMenuButton
                      icon={item.icon}
                      isActive={item.isActive}
                      title={item.title}
                      hasChildren={hasChildren}
                      onClick={async () => {
                        toggleSubNav(item.title);
                      }}
                    />
                  ) : (
                    <Link href={item.url}>
                      <SidebarMenuButton
                        icon={item.icon}
                        isActive={item.isActive}
                        title={item.title}
                      />
                    </Link>
                  )}

                  {hasChildren && (
                    <div
                      className={cn(
                        "ml-10 overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <div className="py-2 space-y-1">
                        {(item.children ?? []).map((child) => (
                          <Link key={child.title} href={child.url}>
                            <SidebarMenuButton
                              icon={child.icon}
                              title={child.title}
                              isActive={child.isActive}
                              className="text-sm font-normal pl-2"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </SidebarMenuItem>
              );
            })}
            <SidebarMenuItem>
              <SidebarMenuButton
                icon={<SignoutDashboardIcon />}
                title="Sign out"
                isActive={false}
                className="text-red-400 hover:bg-red-50 rounded-0"
                onClick={() => logoutMutation.mutate()}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <div className="relative w-[140px] h-[140px] lg:w-[200px] lg:h-[200px] bg-[#6b63ab] flex flex-col items-center rounded-full mx-auto justify-center gap-1">
          <div className="relative w-[80px] h-[80px] lg:w-[120px] lg:h-[120px]">
            <Image priority src={"/img1.png"} alt="student portal" fill />
          </div>
          <strong className="text-sm lg:text-base text-neutral-200">
            Admin Portal
          </strong>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

export default AdminSidebar;
