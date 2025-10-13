import React from "react";
import BaseSidebar, { NavItemsType } from "../baseSidebar";
import {
  AdminDashboardIcon,
  ProfileDashboardIcon,
  SubjectsDashboardIcon,
  ResultDashboardIcon,
  QuickResultDashboardIcon,
} from "@/components/svgs/NavbarSvg";
import { Dot, Edit, Notebook, User, Users } from "lucide-react";
import { title } from "process";

export default function TeacherSidebar({ page }: { page: string }) {
  const navItems: NavItemsType = [
    {
      title: "Dashboard",
      url: "/teacher_section/dashboard",
      isActive: page === "Dashboard",
      icon: <AdminDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Profile",
      url: "/teacher_section/profile",
      isActive: page === "Profile",
      icon: <ProfileDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Subjects",
      url: "/teacher_section/subjects",
      isActive: page === "Subjects",
      icon: <SubjectsDashboardIcon className="w-5 h-5" />,
    },
    {
      title: "Your Students",
      url: "/teacher_section/students",
      isActive: page === "Add Teacher",
      icon: <Users className="w-5 h-5" />,
      children: [
        {
          title: "Your Student Profile",
          url: "/teacher_section/students/profile",
          isActive: page === "Student Profile",
          icon: <Dot size={25} />,
        },
        {
          title: "Input Comment",
          url: "/teacher_section/students/comment",
          isActive: page === "Add Comment",
          icon: <Dot size={25} />,
        },
        {
          title: "Input Assesment",
          url: "/teacher_section/students/assessment",
          isActive: page === "Add Assessment",
          icon: <Dot size={25} />,
        },
      ],
    },

    {
      title: "Results",
      url: "/teacher_section/results",
      isActive: page === "Results",
      icon: <ResultDashboardIcon className="w-5 h-5" />,
      children: [
        {
          title: "View Result",
          url: "/teacher_section/results/view",
          isActive: page === "View Results",
          icon: <Dot size={25} />,
        },
        {
          title: "Add Result",
          url: "/teacher_section/results/add",
          isActive: page === "Add Result",
          icon: <Dot size={25} />,
        },
      ],
    },
    {
      title: "Quick Class Results",
      url: "/teacher_section/quick_class_results",
      isActive: page === "Quick Class Results",
      icon: <QuickResultDashboardIcon className="w-5 h-5" />,
    },
  ];
  return <BaseSidebar navItems={navItems} portal="Teacher" />;
}
