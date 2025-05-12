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
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";

function AdminSidebar({
  page,
  ...props
}: { page?: string; children: [] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const toggleSubNav = (title: string) => {
    setOpenSubNav((prev) => (prev === title ? null : title));
  };

  const navItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      isActive: page === "Admin",
      icon: <AdminDashboardIcon />,
    },
    {
      title: "Profile",
      url: "/admin/profile",
      isActive: page === "Profile",
      icon: <ProfileDashboardIcon />,
    },
    {
      title: "Subjects",
      url: "/admin/subjects/add",
      isActive: page === "Subjects",
      icon: <SubjectsDashboardIcon />,
      children: [
        {
          title: "Add Subject",
          url: "/admin/subjects/add",
          isActive: page === "Add Subject",
          icon: <Dot size={25} />,
        },
      ],
    },
    {
      title: "Add Teacher",
      url: "/admin/Add_Teacher",
      isActive: page === "Add Teacher",
      icon: <AddStudentDashboardIcon />,
    },
    {
      title: "Add Student",
      url: "/admin/Add_Student",
      isActive: page === "Add Student",
      icon: <AddStudentDashboardIcon />,
    },
    {
      title: "List of Teachers",
      url: "/admin/teachers",
      isActive: page === "Teachers",
      icon: <ListDashboardIcon />,
    },
    {
      title: "List of Students",
      url: "/admin/students",
      isActive: page === "Students",
      icon: <ListDashboardIcon />,
    },
    {
      title: "Results",
      url: "/admin/results",
      isActive: page === "Results",
      icon: <ResultDashboardIcon />,
    },
    {
      title: "Quick Class Results",
      url: "admin/quick_class_results",
      isActive: page === "Quick Class Results",
      icon: <QuickResultDashboardIcon />,
    },
    {
      title: "Sign Out",
      url: "/",
      icon: <SignoutDashboardIcon />,
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
        {icon}
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
