import BaseSidebar, { NavItemsType } from "../baseSidebar";
import {
  AdminDashboardIcon,
  ProfileDashboardIcon,
  SubjectsDashboardIcon,
  ResultDashboardIcon,
} from "@/components/svgs/NavbarSvg";

export default function StudentSidebar({ page }: { page: string }) {
  const navItems: NavItemsType = [
    {
      title: "Dashboard",
      url: "./dashboard",
      icon: <AdminDashboardIcon />,
      isActive: page === "Dashboard",
    },
    {
      title: "Profile",
      url: "./profile",
      icon: <ProfileDashboardIcon />,
      isActive: page === "Profile",
    },
    {
      title: "Subjects",
      url: "./subject",
      icon: <SubjectsDashboardIcon />,
      isActive: page === "Subjects",
    },
    {
      title: "Results",
      url: "./results",
      icon: <ResultDashboardIcon />,
      isActive: page === "Results",
    },
  ];

  return <BaseSidebar navItems={navItems} portal="Student" />;
}
