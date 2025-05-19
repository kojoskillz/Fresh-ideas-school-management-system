/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { AppSidebar1 } from "@/components/app-sidebar1"; // Assuming this component exists
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Assuming shadcn/ui components
import { Separator } from "@/components/ui/separator"; // Assuming shadcn/ui components
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // Assuming shadcn/ui components

// Assuming these components are available or you'll create them
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Page() {
  const [userName, setUserName] = useState(""); // Renamed 'name' to 'userName' for clarity
  const [schoolName, setSchoolName] = useState(""); // Corrected state variable name

  // Placeholder student data (replace with actual data fetching logic)
  // This data will also be used to initialize the settings form
  const [studentData, setStudentData] = useState({
    name: "JANET MARVELOUS",
    admissionNo: "100002",
    class: "basic 4 white",
    category: "Day",
    address: "13, Johnson Street, Yaba, Lagos",
    dob: "01-03-2000",
    phoneNumber: "+2348036363636",
    gender: "Female",
    religion: "Christain",
    password: "password", // Note: Storing plain password is not secure. This is illustrative.
    fatherName: "Marvelous Becker",
    motherName: "Marvelous Joyce",
    profileImageUrl: "/placeholder-avatar.png", // Add a placeholder image or handle avatar upload state
  });

   // State to manage the editable form data in the Settings tab
   const [formData, setFormData] = useState(studentData);

   // Effect to initialize form data when studentData is loaded
   useEffect(() => {
       setFormData(studentData);
   }, [studentData]); // Re-initialize if studentData changes (e.g., after fetching)


  // Fetch userName from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Fetch schoolName from localStorage
  useEffect(() => {
    const storedName1 = localStorage.getItem("schoolName");
    if (storedName1) {
      setSchoolName(storedName1);
    }
  }, []);

  // Handler for input changes in the settings form
  interface FormData {
    name: string;
    admissionNo: string;
    class: string;
    category: string;
    address: string;
    dob: string;
    phoneNumber: string;
    gender: string;
    religion: string;
    password?: string;
    fatherName: string;
    motherName: string;
    profileImageUrl?: string;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
        ...prevFormData,
        [id]: value ?? ""
    }));
  };

  // Handler for the Save button
  const handleSave = () => {
      console.log("Saving student data:", formData);
      // TODO: Implement actual save logic here, e.g., send data to an API
      alert("Data saved (simulated)"); // Simple alert for demonstration
      // Update the displayed data in the "About" tab if save was successful
      // setStudentData(formData); // Uncomment this if you want to reflect changes immediately in "About"
  };


  return (
    <SidebarProvider>
      {/* AppSidebar1 is assumed to be a component you have */}
      <AppSidebar1 />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {/* Updated Breadcrumb to match image */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Student&lsquo;s Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header elements from image: Search, Teacher Name, Avatar */}
          {/* You might need to add state and handlers for search */}
          <div className="ml-auto flex items-center gap-4">
             {/* Search Bar (basic example) */}
            <div className="relative ml-auto flex-1 md:grow-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75a6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            {/* Teacher Name and Role (using userName state) */}
            <div className="text-sm">
                <div className="font-medium">{userName || "Teacher's Name"}</div>
                <div className="text-muted-foreground">TEACHER</div> {/* Role is hardcoded based on image */}
            </div>
            {/* Avatar/Profile Icon */}
             <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                 {/* Replace with actual avatar image or component */}
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0v3.75a2.25 2.25 0 01-1.5 2.122l-1.315.44a2.25 2.25 0 00-1.137 2.107V16.5h.002a.75.75 0 01.364.085l.718.384a1.5 1.5 0 001.432-.178l.28-.14a1.5 1.5 0 011.661-.053l.164.082a1.5 1.5 0 001.567.29l1.88-1.253a1.5 1.5 0 00-.369-2.22l-.153-.102a2.25 2.25 0 01-.807-3.07l.14-.21a2.25 2.25 0 00-.81-3.11l-.136-.09a2.25 2.25 0 01-1.134-2.11V6Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M11.78 15.76c.141.05.29.092.44.126V16.5h-.002a.75.75 0 01-.364-.085l-.718-.384a1.5 1.5 0 00-1.432.178l-.28.14a1.5 1.5 0 01-1.66.053l-.165-.082a1.5 1.5 0 00-1.567-.295l-1.881 1.254a1.5 1.5 0 00.369 2.219l.153.102a2.25 2.25 0 01.807 3.07l-.141.21a2.25 2.25 0 00.81 3.111l.135.09a2.25 2.25 0 011.135 2.109v.375a.75.75 0 001.5 0v-.375a4.5 4.5 0 10-9 0v.375a.75.75 0 001.5 0v-.375a2.25 2.25 0 011.135-2.109l.135-.09a2.25 2.25 0 00.81-3.111l-.14-.21a2.25 2.25 0 01.807-3.07l.153-.102a1.5 1.5 0 00.369-2.219l-1.88-1.254a1.5 1.5 0 00-1.567-.29l-.164.082a1.5 1.5 0 01-1.661.053l-.28-.14a1.5 1.5 0 00-1.432-.178l-.718.384a.75.75 0 01-.364.085H4.5a.75.75 0 00-.75.75V18a2.25 2.25 0 002.25 2.25h.375a.75.75 0 000-1.5H6a.75.75 0 01.75-.75h1.5a.75.75 0 000-1.5H6.75A.75.75 0 016 14.25h-.375a.75.75 0 000 1.5H6A.75.75 0 016.75 16.5h1.5a.75.75 0 000-1.5H7.5Z" clipRule="evenodd" />
                    </svg>

             </div>
          </div>
        </header>

        {/* Main Content Area - Implementing the layout from the image */}
        <div className="flex flex-1 flex-col gap-4 p-4 md:grid md:grid-cols-3 lg:grid-cols-4 bg-gray-100"> {/* Used gray-100 for a softer background */}
          {/* Left Column: Profile Picture and Basic Info */}
          <Card className="md:col-span-1 lg:col-span-1 p-4 flex flex-col items-center gap-4">
            <div className="relative h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Placeholder for student image */}
              {studentData.profileImageUrl ? (
                 <Image
                    src={studentData.profileImageUrl}
                    alt="Student Avatar"
                    width={128}
                    height={128}
                    className="object-cover rounded-full"
                 />
              ) : (
                // Fallback if no image
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-gray-500">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0v3.75a2.25 2.25 0 01-1.5 2.122l-1.315.44a2.25 2.25 0 00-1.137 2.107V16.5h.002a.75.75 0 01.364.085l.718.384a1.5 1.5 0 001.432-.178l.28-.14a1.5 1.5 0 011.661-.053l.164.082a1.5 1.5 0 001.567.29l1.88-1.253a1.5 1.5 0 00-.369-2.22l-.153-.102a2.25 2.25 0 01-.807-3.07l.14-.21a2.25 2.25 0 00-.81-3.11l-.136-.09a2.25 2.25 0 01-1.134-2.11V6Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M11.78 15.76c.141.05.29.092.44.126V16.5h-.002a.75.75 0 01-.364-.085l-.718-.384a1.5 1.5 0 00-1.432.178l-.28.14a1.5 1.5 0 01-1.66.053l-.165-.082a1.5 1.5 0 00-1.567-.295l-1.881 1.254a1.5 1.5 0 00.369 2.219l.153.102a2.25 2.25 0 01.807 3.07l-.141.21a2.25 2.25 0 00.81 3.111l.135.09a2.25 2.25 0 011.135 2.109v.375a.75.75 0 001.5 0v-.375a4.5 4.5 0 10-9 0v.375a.75.75 0 001.5 0v-.375a2.25 2.25 0 011.135-2.109l.135-.09a2.25 2.25 0 00.81-3.111l-.14-.21a2.25 2.25 0 01.807-3.07l.153-.102a1.5 1.5 0 00.369-2.219l-1.88-1.254a1.5 1.5 0 00-1.567-.29l-.164.082a1.5 1.5 0 01-1.661.053l-.28-.14a1.5 1.5 0 00-1.432-.178l-.718.384a.75.75 0 01-.364.085H4.5a.75.75 0 00-.75.75V18a2.25 2.25 0 002.25 2.25h.375a.75.75 0 000-1.5H6a.75.75 0 01.75-.75h1.5a.75.75 0 000-1.5H6.75A.75.75 0 016 14.25h-.375a.75.75 0 000 1.5H6A.75.75 0 016.75 16.5h1.5a.75.75 0 000-1.5H7.5Z" clipRule="evenodd" />
                    </svg>
              )}
            </div>
            {/* File Upload Input - Hidden visually */}
            <Input type="file" id="profile-upload" className="sr-only" />
            {/* Custom Button to trigger file input */}
            <Label htmlFor="profile-upload" className="w-full"> {/* Made label width full for button */}
                {/* "Choose a file" button - Keep secondary variant */}
                <Button asChild className="w-full" variant="secondary">
                    <span>Choose a file</span>
                </Button>
            </Label>
            {/* Placeholder for file name */}
            <div className="text-sm text-muted-foreground">No file chosen</div>

            {/* Upload Button - Added pink background and hover effect */}
            <Button
              className="w-full bg-pink-500 text-white hover:bg-pink-600" // Added custom pink color and hover
              variant="default" // Use default variant to allow background color override
            >
              Upload
            </Button>

            {/* Student Basic Info */}
            <div className="text-center font-bold text-lg mt-4">
                {studentData.name}
            </div>
             <div className="w-full text-sm text-left mt-2 space-y-2">
                <div>
                    <span className="font-semibold">Admission No:</span> {studentData.admissionNo}
                </div>
                 <div>
                    <span className="font-semibold">Class:</span> {studentData.class}
                </div>
                <div>
                    <span className="font-semibold">Category:</span> {studentData.category}
                </div>
                 <div>
                    <span className="font-semibold">Address:</span> {studentData.address}
                </div>
             </div>
          </Card>

          {/* Right Column: Tabs for About and Settings */}
          <Card className="md:col-span-2 lg:col-span-3 p-4">
             {/* Tabs - Added subtle hover to inactive triggers and explicit active styling */}
             <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-2">
                    {/* About Tab Trigger - Explicit active blue background and white text */}
                    <TabsTrigger
                        value="about"
                        className="data-[state=inactive]:hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        About
                    </TabsTrigger>
                     {/* Settings Tab Trigger - Explicit active blue background and white text */}
                    <TabsTrigger
                        value="settings"
                        className="data-[state=inactive]:hover:bg-blue-100 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                        Settings
                    </TabsTrigger>
                </TabsList>
                {/* About Tab Content (from previous implementation) */}
                <TabsContent value="about" className="mt-4">
                    <h3 className="text-md font-semibold mb-4">PERSONAL PROFILE</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Below is the profile information of the student. All you to need know about the student (address, phone number, parent name etc)
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Full Name:</span>
                                <span>{studentData.name}</span>
                            </div>
                             <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Date of Birth:</span>
                                <span>{studentData.dob}</span>
                            </div>
                            <div className="flex items-center">
                                 <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Phone number:</span>
                                <span>{studentData.phoneNumber}</span>
                            </div>
                             <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Gender:</span>
                                <span>{studentData.gender}</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Religion:</span>
                                <span>{studentData.religion}</span>
                            </div>
                             <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Password:</span>
                                <span>{studentData.password}</span> {/* Be cautious with displaying passwords */}
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Father&lsquo;s name:</span>
                                <span>{studentData.fatherName}</span>
                            </div>
                             <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div> {/* Small blue circle */}
                                <span className="font-semibold w-1/3">Mother&apos;s name:</span>
                                <span>{studentData.motherName}</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>
                {/* Settings Tab Content (NEW) */}
                <TabsContent value="settings" className="mt-4">
                    <h3 className="text-md font-semibold mb-4">PERSONAL INFORMATION</h3>
                     <p className="text-sm text-muted-foreground mb-6">
                        You can edit the student&lsquo;s information below, kindly be informed that any uteration or modification of the information will replace the previous information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* Row 1: Student's name */}
                        <div className="md:col-span-2">
                            <Label htmlFor="name">Student&lsquo;s name</Label>
                            <Input id="name" value={formData.name} onChange={handleInputChange} />
                        </div>
                        {/* Row 2: Date of Birth, Category, Gender */}
                        <div>
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="text" placeholder="dd/mm/yyyy" value={formData.dob} onChange={handleInputChange} /> {/* Consider a date picker component */}
                        </div>
                        <div>
                             <Label htmlFor="category">Category</Label>
                            <Input id="category" value={formData.category} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" value={formData.gender} onChange={handleInputChange} />
                        </div>
                         {/* Row 3: Mobile No, Religion */}
                        <div>
                            <Label htmlFor="phoneNumber">Mobile No</Label>
                            <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="religion">Religion</Label>
                            <Input id="religion" value={formData.religion} onChange={handleInputChange} />
                        </div>
                        {/* Row 4: Address */}
                        <div className="md:col-span-2">
                             <Label htmlFor="address">Address</Label>
                            <Input id="address" value={formData.address} onChange={handleInputChange} />
                        </div>
                        {/* Row 5: Father's name, Mother's name */}
                        <div>
                            <Label htmlFor="fatherName">Father&lsquo;s name</Label>
                            <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="motherName">Mother&lsquo;s name</Label>
                            <Input id="motherName" value={formData.motherName} onChange={handleInputChange} />
                        </div>
                         {/* Row 6: Class, Category (appears again in image?), Admission No, Password */}
                         {/* Note: Category appears twice in the image - I'll include it again but you might want to verify this is correct */}
                        <div>
                            <Label htmlFor="class">Class</Label>
                            <Input id="class" value={formData.class} onChange={handleInputChange} />
                        </div>
                         <div>
                            <Label htmlFor="category2">Category</Label> {/* Renamed id to category2 to avoid conflict */}
                            <Input id="category2" value={formData.category} onChange={handleInputChange} /> {/* Using the same category value */}
                        </div>
                        <div>
                            <Label htmlFor="admissionNo">Admission No</Label>
                            <Input id="admissionNo" value={formData.admissionNo} onChange={handleInputChange} readOnly /> {/* Admission No is likely read-only */}
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={formData.password} onChange={handleInputChange} /> {/* Be cautious with editing passwords here */}
                        </div>
                    </div>
                     {/* Save Button - Added blue background and hover effect */}
                    <div className="flex justify-end mt-6">
                        <Button
                            onClick={handleSave}
                            className="bg-blue-500 text-white hover:bg-blue-600" // Added custom blue color and hover
                            variant="default" // Use default variant to allow background color override
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                                <path fillRule="evenodd" d="M9 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM16.5 4.5a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H17.25a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                <path d="M6 3a3 3 0 00-3 3v.75a.75.75 0 001.5 0V6a1.5 1.5 0 011.5-1.5h1.5a.75.75 0 000-1.5H6zM3 16.5a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM6 18a3 3 0 00-3 3v.75a.75.75 0 001.5 0V21a1.5 1.5 0 011.5-1.5h1.5a.75.75 0 000-1.5H6zM16.5 16.5a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H17.25a.75.75 0 01-.75-.75zM18 18a3 3 0 00-3 3v.75a.75.75 0 001.5 0V21a1.5 1.5 0 011.5-1.5h1.5a.75.75 0 000-1.5H18zM12.75 3a.75.75 0 00-1.5 0v18a.75.75 0 001.5 0V3z" />
                            </svg>
                            Save
                        </Button>
                    </div>
                </TabsContent>
             </Tabs>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
