"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  ChevronUp,
  User,
  MessageSquareText,
  FileText,
  Home,
  UserCircle,
  BookOpen,
  Users,
  Clock,
  BarChart,
  LogOut,
  PlusCircle,
  Eye,
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
        { title: "Dashboard", url: "./dashboard", icon: <Home size={16} /> },
        { title: "Profile", url: "./profile", icon: <UserCircle size={16} /> },
        { title: "Subjects", url: "./subjects", icon: <BookOpen size={16} /> },
        {
          title: "Your Students",
          icon: <Users size={16} />,
          children: [
            {
              title: "Your Student Profile",
              url: "./your_students/student-profile",
              icon: <User size={16} />,
            },
            {
              title: "Input Comment",
              url: "./your_students/input_comment",
              icon: <MessageSquareText size={16} />,
            },
            {
              title: "Input Assessment",
              url: "./your_students/input_assessment",
              icon: <FileText size={16} />,
            },
          ],
        },
        {
          title: "View Previous Results",
          url: "./view_class_results",
          icon: <Clock size={16} />,
        },
              {
          title: "Results",
          icon: <BarChart size={16} />,
          children: [
            {
              title: "Add Result",
              url: "./results/add_result",
              icon: <PlusCircle size={16} />,
            },
            {
              title: "View Result",
              url: "./results/view_result",
              icon: <Eye size={16} />,
            },
          ],
        },
        {
          title: "Quick Class Results",
          url: "./quick_class_results",
          icon: <BarChart size={16} />,
        },
        { title: "Sign Out", url: "/", icon: <LogOut size={16} /> },
      ],
    },
  ],
}

export function AppSidebar1({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    const foundDropdown = data.navMain[0].items.find((item) => {
      if (!item.children) return false
      return item.children.some((child) => {
        return pathname.startsWith(child.url.replace(/^\./, ""))
      })
    })
    setOpenDropdown(foundDropdown ? foundDropdown.title : null)
  }, [pathname])

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
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </span>
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
                                isActive={
                                  pathname === child.url.replace(/^\./, "") ||
                                  pathname === child.url
                                }
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
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === item.url.replace(/^\./, "") || pathname === item.url
                        }
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          {item.icon}
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Student Portal image at the bottom */}
      <div className="flex flex-col items-center justify-center p-4">
        <img
          src="/img1.png" // Place this image in /public folder or update path
          alt="Student Portal"
          className="w-32 h-32 object-contain rounded-full"
        />
        <p className="text-sm font-semibold mt-2">Student Portal</p>
      </div>

      <SidebarRail />
    </Sidebar>
  )
}
