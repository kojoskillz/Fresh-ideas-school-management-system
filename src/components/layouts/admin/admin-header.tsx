"use client";

import React from "react";

import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
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

interface AdminHeaderProps {
  header?: string | React.ReactNode;
  showSearch: boolean;
}
function AdminHeader({ header, showSearch }: AdminHeaderProps) {
  const form = useForm();
  const { user } = useAuth();

  const displayName = user?.name ?? "";

  const initials =
    displayName.split(" ").length > 1
      ? displayName.split(" ")[0][0] + displayName.split(" ")[1][0]
      : displayName.slice(0, 2);

  return (
    <header className="py-2 px-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <SidebarTrigger size="lg" />
          <div className="ml-3 mr-5 h-5">
            <Separator orientation="vertical" className="bg-gray-400" />
          </div>
          {showSearch ? (
            <Form {...form}>
              <form className="flex flex-col items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl>
                        {/* <div className="relative"> */}
                        <Input
                          className="bg-white rounded-none"
                          {...field}
                          placeholder="Search..."
                        />

                        {/* </div> */}
                      </FormControl>
                      <Button
                        type="submit"
                        className="absolute right-0 top-0"
                        variant="ghost"
                      >
                        <Search />
                      </Button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
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
            <p className="text-xs flex justify-end">Junior sectinal head</p>
          </div>

          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage className="w-full h-full" />
            <AvatarFallback
              className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium text-violet11 bg-white"
              delayMs={600}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
