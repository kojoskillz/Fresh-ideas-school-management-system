"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  User,
  MessageSquareText,
  FileText,
} from "lucide-react"
import { SearchForm } from "@/components/search-form"
import { VersionSwitcher } from "@/components/version-switcher"
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
} from "@/components/ui/sidebar"

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Profile", url: "/profile" },
        { title: "Subjects", url: "/subjects" },
        {
          title: "Your Students",
          url: "#",
          children: [
            {
              title: "Your Student Profile",
              url: "/your_students/profile",
              icon: <User size={16} />,
            },
            {
              title: "Add Comment",
              url: "/your_students/comment",
              icon: <MessageSquareText size={16} />,
            },
            {
              title: "Add Assessment",
              url: "/your_students/assessment",
              icon: <FileText size={16} />,
            },
          ],
        },
        { title: "View Previous Results", url: "/view_previous_results" },
        { title: "Quick Class Results", url: "/quick_class_results" },
        { title: "Sign Out", url: "/" },
      ],
    },
  ],
}

export function AppSidebar1({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title))
  }

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
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) =>
                  item.children ? (
                    <SidebarMenuItem key={item.title} className="flex flex-col">
                      <SidebarMenuButton
                        onClick={() => toggleDropdown(item.title)}
                        className="flex items-center justify-between w-full"
                      >
                        <span>{item.title}</span>
                        {openDropdown === item.title ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </SidebarMenuButton>
                      {openDropdown === item.title && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <SidebarMenuItem key={child.title}>
                              <SidebarMenuButton
                                asChild
                                isActive={pathname === child.url}
                              >
                                <a
                                  href={child.url}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  {child.icon}
                                  {child.title}
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={pathname === item.url}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
