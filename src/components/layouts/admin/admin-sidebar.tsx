"use client";

import * as React from "react";
import {
  AdminDashboardIcon,
  ProfileDashboardIcon,
  SubjectsDashboardIcon,
  AddStudentDashboardIcon,
  ListDashboardIcon,
  ResultDashboardIcon,
  QuickResultDashboardIcon,
} from "@/components/svgs/NavbarSvg";
import { Dot } from "lucide-react";
import BaseSidebar, { NavItemsType } from "../baseSidebar";


function AdminSidebar({ page }: { page?: string }) {
  const navItems: NavItemsType = [
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
          title: "View Result",
          url: "/admin_section/results/view",
          isActive: page === "View Result",
          icon: <Dot size={25} />,
        },
        {
          title: "Add Result",
          url: "/admin_section/results/add",
          isActive: page === "Add Result",
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

  return <BaseSidebar navItems={navItems} portal="Admin" />;
}

export default AdminSidebar;
