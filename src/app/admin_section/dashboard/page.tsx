"use client";
import Image from "next/image"

import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  const [name, setName] = useState("");
  const [schoolname, setSchoolName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
    }
  }, []);
  
  useEffect(() => {
    const storedName1 = localStorage.getItem("schoolName");
    if (storedName1) {
      setName(storedName1);
    }
  }, []);
  

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Admin</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 bg-gray-300 flex-col  gap-4 p-4">
        <div className="bg-[#A926C7] min-h-[100vh] flex-1 flex-col rounded-xl md:min-h-min">
        <div className="flex flex-col  p-5 gap-2">
            {name && <h2 className="text-5xl font-bold text-white">Welcome, {name}!</h2>}
            {schoolname && <h2 className="text-5xl font-bold text-white">Welcome, {schoolname}!</h2>}
            <h1 className="text-4xl font-bold text-white text-left">Welcome to Your Dashboard</h1>
        </div>
    {/* image */}
                         <Image
                            src="/img4.png"
                            width={200}
                            height={200}
                            alt=""
                            className="object-contain place-content-end items-end absolute mt-[-6rem] ml-[60rem] "
                          />
        </div> 

          <div className="grid auto-rows-min  gap-4 md:grid-cols-3">

         {/* teachers statistics */}
          <div className="bg-muted/50 bg-white aspect-video rounded-xl"> 
                <h1 className="m-2 text-xl text-gray-500 font-semibold">
                   Teachers
               </h1> 
               <div className="flex place-content-center mt-10 gap-4 m-auto ">
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Male Teachers
                      </h1>
                      <h1  className="text-5xl font-bold text-blue-400">
                          100
                      </h1>
                   </div>
                  
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Female Teachers
                      </h1>
                      <h1  className="text-5xl font-bold text-green-400">
                          100
                      </h1>
                   </div>
                  
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Total Teachers
                      </h1>
                      <h1  className="text-5xl font-bold text-purple-400">
                          100
                      </h1>
                   </div>
                  

               </div>
          </div> 

             {/* students statistics */}
          <div className="bg-muted/50 bg-white aspect-video rounded-xl"> 
                <h1 className="m-2 text-xl text-gray-500 font-semibold">
                   Students
               </h1> 
               <div className="flex place-content-center mt-10 gap-4 m-auto ">
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Male Students
                      </h1>
                      <h1  className="text-5xl font-bold text-blue-400">
                          200
                      </h1>
                   </div>
                  
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Female Students
                      </h1>
                      <h1  className="text-5xl font-bold text-green-400">
                          1400
                      </h1>
                   </div>
                  
                   <div className="grid">
                      <h1 className="text-md text-gray-600">
                          Total Students
                      </h1>
                      <h1  className="text-5xl font-bold text-purple-400">
                          1200
                      </h1>
                   </div>

               </div>
               
          </div> 
       
          
           {/* teachers statistics */}
           <div className="bg-muted/50 bg-white aspect-video rounded-xl"> 
                <h1 className="m-2 text-xl text-gray-500 font-semibold">
                   Fees
               </h1> 
              
          </div> 

          


          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
