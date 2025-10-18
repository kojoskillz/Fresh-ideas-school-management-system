import React from "react";
import BaseSidebar, { NavItemsType } from "../baseSidebar";
import {
  AdminDashboardIcon,
  ProfileDashboardIcon,
  SubjectsDashboardIcon,
  ResultDashboardIcon,
  QuickResultDashboardIcon,
} from "@/components/svgs/NavbarSvg";
import { Dot, Users } from "lucide-react";

export default function TeacherSidebar({ page }: { page: string }) {
  const navItems: NavItemsType = [
    {
      title: "Dashboard",
      url: "/teacher/dashboard",
      isActive: page === "Dashboard",
      icon: <AdminDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Profile",
      url: "/teacher/profile",
      isActive: page === "Profile",
      icon: <ProfileDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Subjects",
      url: "/teacher/subjects",
      isActive: page === "Subjects",
      icon: <SubjectsDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Your Students",
      url: "/teacher/students",
      isActive: page === "Your Students",
      icon: <Users className="w-5 h-5" />,
    },

    {
      title: "Results",
      url: "/teacher/results",
      isActive: page === "Results",
      icon: <ResultDashboardIcon className="w-5 h-5" />,
      children: [
        {
          title: "View Results",
          url: "/teacher/results/view",
          isActive: page === "View Results",
          icon: <Dot size={25} />,
        },
        {
          title: "Add Result",
          url: "/teacher/results/add",
          isActive: page === "Add Result",
          icon: <Dot size={25} />,
        },
      ],
    },
    {
      title: "Quick Class Results",
      url: "/teacher/quick_class_results",
      isActive: page === "Quick Class Results",
      icon: <QuickResultDashboardIcon className="w-5 h-5" />,
    },
  ];
  return <BaseSidebar navItems={navItems} portal="Teacher" />;
}
