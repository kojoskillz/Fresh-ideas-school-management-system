import React from "react";

import { Form, FormControl, FormItem, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import MoonIcon from "@/components/svgs/MoonIcon";
import FullScreenIcon from "@/components/svgs/FullScreenIcon";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function AdminHeader({ header }: { header?: string }) {
  const form = useForm();

  return (
    <header className="py-2 px-4">
      <div className="flex justify-between w-full mb-4">
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
        <div className="flex gap-3">
          <div>
            <Button size="lg" variant="ghost">
              <MoonIcon />
            </Button>
            <Button size="lg" variant="ghost">
              <FullScreenIcon />
            </Button>
          </div>
          <div className="">
            <p className="font-bold">MRS FLORENCE IDOWU</p>
            <p className="text-xs flex justify-end">Junior sectinal head</p>
          </div>
          {/* <Avatar src="/img.png" /> */}
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage className="w-full h-full" />
            <AvatarFallback
              className="leading-1 flex size-full items-center justify-center  text-[15px] font-medium text-violet11 bg-white"
              delayMs={600}
            >
              MF
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      {header}
    </header>
  );
}

export default AdminHeader;
