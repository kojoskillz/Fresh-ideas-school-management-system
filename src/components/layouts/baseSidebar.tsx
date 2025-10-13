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
import { SignoutDashboardIcon } from "@/components/svgs/NavbarSvg";
import { usePathname } from "next/navigation";
import { ChevronSvg } from "@/components/svgs/Chevron";
import { useAuth } from "@/hooks/use-auth";

export type NavItemsType = {
  title: string;
  url: string;
  isActive: boolean;
  icon: React.ReactNode;
  children?: {
    title: string;
    url: string;
    isActive: boolean;
    icon: React.ReactNode;
  }[];
}[];

export default function BaseSidebar({
  page,
  ...props
}: {
  page?: string;
  children?: [];
  navItems: NavItemsType;
  portal: string;
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { logoutMutation } = useAuth();

  const toggleSubNav = (title: string) => {
    setOpenSubNav((prev) => (prev === title ? null : title));
  };

  const [openSubNav, setOpenSubNav] = React.useState<string | null>(() => {
    const parentWithActiveChild = props.navItems.find((item) =>
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
          "text-sm px-6 py-2 rounded-md w-full text-left transition-colors flex items-center gap-4 cursor-pointer ",
          isActive ? "text-secondary" : "hover:bg-muted text-muted-foreground",
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
            {props.navItems.map((item) => {
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
            {props.portal} Portal
          </strong>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
