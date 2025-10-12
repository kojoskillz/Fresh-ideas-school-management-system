"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useDebounce } from "@/hooks/use-debounce";
import { AdminProfile } from "@/types/admin";

interface AdminHeaderProps {
  header?: string | React.ReactNode;
}
function AdminHeader({ header }: AdminHeaderProps) {
  const { user } = useAuth();
  const { setSearch, search, showSearch } = useAuth();
  const [searchValue, setSearchValue] = useState(search);
  const debouncedSearch = useDebounce(searchValue, 500);

  const displayName = user?.name ?? "";

  const initials =
    displayName.split(" ").length > 1
      ? displayName.split(" ")[0][0] + displayName.split(" ")[1][0]
      : displayName.slice(0, 2);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <header className="py-2 px-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <SidebarTrigger size="lg" />
          <div className="ml-3 mr-5 h-5">
            <Separator orientation="vertical" className="bg-gray-400" />
          </div>
          {showSearch ? (
            <form className="flex flex-col items-center gap-4">
              <Input
                aria-label=" Search classes, students, teachers..."
                name="search"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                type="text"
                className="bg-white rounded-none"
                placeholder="Search..."
              />
            </form>
          ) : (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden sm:block">
                  <BreadcrumbLink href="#">Admin</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{header}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
        <div className="flex items-center gap-3 py-2">
          <div className="">
            <p className="font-bold">{user?.name}</p>
            <p className="text-xs flex justify-end">
              {(user?.profile as AdminProfile)?.position}
            </p>
          </div>

          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage className="w-full h-full" src={user?.img_url} />

            {!user?.img_url && (
              <AvatarFallback
                className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium text-violet11 bg-white"
                delayMs={600}
              >
                {initials}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
