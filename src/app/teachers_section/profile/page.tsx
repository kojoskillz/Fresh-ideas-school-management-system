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
} from "@/components/ui/breadcrumb"; // Assuming these components exist
import { Separator } from "@/components/ui/separator"; // Assuming this component exists
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"; // Assuming these components exists

// Assuming you have an Input component or will use a standard HTML input
// import { Input } from "@/components/ui/input";

export default function Page() {
  // Keeping state variables from the original code
  const [name, setName] = useState("");
  const [schoolname, setSchoolName] = useState(""); // schoolname is not used in the profile layout shown
  const [activeTab, setActiveTab] = useState("about"); // State to manage active tab

  // State for form inputs in the Settings tab (using placeholders for now)
  const [settingsForm, setSettingsForm] = useState({
    teacherName: "",
    dateOfBirth: "",
    gender: "",
    mobileNo: "",
    religion: "",
    phoneNumber: "",
    address: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    class: "",
    password: "", // Note: Handling passwords in frontend state requires careful consideration
  });

  // Fetch user name from localStorage and populate initial form state
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setName(storedName);
      // Populate the form with initial data if available (simulated here)
      setSettingsForm(prevState => ({
        ...prevState,
        teacherName: storedName, // Assuming userName is the teacher's name
        // You would fetch other profile details here from an API in a real app
        dateOfBirth: "dd/mm/yyyy", // Placeholder
        gender: "Null", // Placeholder
        mobileNo: "Null", // Placeholder
        religion: "Null", // Placeholder
        phoneNumber: "Null", // Placeholder
        address: "Null", // Placeholder
        nextOfKinName: "Null", // Placeholder
        nextOfKinPhone: "Null", // Placeholder
        class: "Basic four white", // Placeholder
        password: "Password", // Placeholder
      }));
    }
     // Remove or comment out the schoolName effect if it's not needed for this page
     // useEffect(() => {
     //   const storedName1 = localStorage.getItem("schoolName");
     //   if (storedName1) {
     //     setName(storedName1); // This was overwriting name, should be setSchoolName
     //   }
     // }, []);
  }, []);

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettingsForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    // Placeholder data for the About tab based on the screenshot
  const profileDetails = {
    fullName: name || "MISS JANE FRANCIS", // Use the `name` state or placeholder
    teacherNumber: "1234567890", // Placeholder
    email: "janefrancis@gmail.com", // Placeholder
    phoneNumber: "+2348036363636", // Placeholder
    password: "password", // Placeholder (Note: Storing password in state/displaying is insecure)
    bloodGroup: "O+", // Placeholder
    address: "13, Johnson Street, Yaba, Lagos", // Placeholder
    dateOfBirth: "01-03-1990", // Placeholder
    gender: "Female", // Placeholder
    religion: "Christian", // Placeholder
  };


  // Handler for saving settings (placeholder)
  const handleSaveSettings = () => {
    console.log("Saving settings:", settingsForm);
    // Implement your save logic here, likely sending data to an API
  };

  return (
    <SidebarProvider>
      {/* Assuming AppSidebar1 matches the sidebar in the image */}
      <AppSidebar1 />
      <SidebarInset>
        {/* Header Section (Modified Breadcrumb) */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                {/* Breadcrumb updated to match Profile page */}
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {/* Breadcrumb updated to match Profile page */}
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
           {/* Added placeholder for teacher's name in header as seen in the image */}
           {/* Use the `name` state variable here */}
           <div className="ml-auto flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg> {/* Moon/Sun icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg> {/* Menu icon placeholder */}
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg> {/* User icon placeholder */}
                 <span className="text-sm text-gray-700">{name || "teacher's name"}</span> {/* Use the `name` state */}
           </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 bg-gray-100 flex-col gap-4 p-4 lg:flex-row">

          {/* Left Column: Profile Image and Basic Info */}
          <div className="flex flex-col gap-4 w-full lg:w-1/3">
             <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center">
                 {/* Profile Image Placeholder */}
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-4">
                    {/* You would render the Image component here if you had a src */}
                </div>
                {/* File Upload */}
                <div className="flex gap-2 items-center mb-4">
                    <button className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Choose a file
                    </button>
                    <span className="text-sm text-gray-500">No file chosen</span>
                </div>
                 {/* Upload Button */}
                 <button className="px-6 py-2 mb-4 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-600">
                    Upload
                 </button>

                 {/* Displayed Name */}
                 <h2 className="text-lg font-bold text-gray-800 mb-4">{profileDetails.fullName}</h2>

                 {/* Contact and Other Details */}
                 <div className="w-full text-gray-700 text-sm flex flex-col gap-2">
                    <p><strong>Email:</strong> {profileDetails.email}</p>
                    <p><strong>Phone number:</strong> {profileDetails.phoneNumber}</p>
                    {/* Insecure: Do not display passwords. */}
                    <p><strong>Password:</strong> {profileDetails.password}</p>
                     <p><strong>Blood Group:</strong> {profileDetails.bloodGroup}</p>
                      <p><strong>Address:</strong> {profileDetails.address}</p>
                 </div>
             </div>
          </div>


          {/* Right Column: Tabs and Content */}
          <div className="flex flex-col gap-4 w-full lg:w-2/3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "about"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === "settings"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              {activeTab === "about" && (
                <div>
                  <h2 className="text-md font-semibold text-gray-800 mb-4">PERSONAL PROFILE</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Below is the profile information of the teacher. All you to need know about the teacher (address, phone number, password etc)
                  </p>
                  {/* Two columns for details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
                     {/* Left inner column */}
                    <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                             <strong>Full Name:</strong> {profileDetails.fullName}
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                            <strong>Date Of Birth:</strong> {profileDetails.dateOfBirth}
                         </div>
                          <div className="flex items-center gap-2">
                             <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                             <strong>Phone number:</strong> {profileDetails.phoneNumber}
                         </div>
                         <div className="flex items-center gap-2">
                             <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                             <strong>Gender:</strong> {profileDetails.gender}
                         </div>
                    </div>

                     {/* Right inner column */}
                     <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                             <strong>Religion:</strong> {profileDetails.religion}
                         </div>
                          <div className="flex items-center gap-2">
                             <span className="h-2 w-2 bg-blue-500 rounded-full"></span> {/* Dot icon placeholder */}
                             {/* Insecure: Do not display passwords. */}
                             <strong>Password:</strong> {profileDetails.password}
                         </div>
                     </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                // Settings Tab Content based on the third screenshot
                <div>
                  <h2 className="text-md font-semibold text-gray-800 mb-4">PERSONAL INFORMATION</h2>
                   <p className="text-sm text-gray-600 mb-6">
                     You can edit your information below, kindly be informed that any uteration or modification of the
                     information will replace the previous information.
                   </p>

                  {/* Settings Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
                     {/* Row 1 */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="teacherName" className="font-medium">Teacher's name</label>
                      <input
                        id="teacherName"
                        name="teacherName"
                        type="text"
                        value={settingsForm.teacherName}
                        onChange={handleInputChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Teacher's name" // Added placeholder
                      />
                    </div>
                     {/* Empty div to maintain grid structure */}
                     <div></div>


                     {/* Row 2 */}
                     <div className="flex flex-col gap-1">
                      <label htmlFor="dateOfBirth" className="font-medium">Date of Birth</label>
                       <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="text" // Consider using type="date" for actual date picking
                        value={settingsForm.dateOfBirth}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="dd/mm/yyyy" // Added placeholder
                      />
                    </div>
                     <div className="flex flex-col gap-1">
                      <label htmlFor="gender" className="font-medium">Gender</label>
                       <input
                        id="gender"
                        name="gender"
                        type="text" // Consider a select dropdown for gender
                        value={settingsForm.gender}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>

                    {/* Row 3 */}
                     <div className="flex flex-col gap-1">
                      <label htmlFor="mobileNo" className="font-medium">Mobile No</label>
                       <input
                        id="mobileNo"
                        name="mobileNo"
                        type="text"
                        value={settingsForm.mobileNo}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>
                     <div className="flex flex-col gap-1">
                      <label htmlFor="religion" className="font-medium">Religion</label>
                       <input
                        id="religion"
                        name="religion"
                        type="text"
                        value={settingsForm.religion}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>

                    {/* Row 4 */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="phoneNumber" className="font-medium">Phone number</label>
                       <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={settingsForm.phoneNumber}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>
                     {/* Empty div to maintain grid structure */}
                     <div></div>

                     {/* Row 5 */}
                     <div className="flex flex-col gap-1 col-span-2"> {/* Make address span two columns */}
                      <label htmlFor="address" className="font-medium">Address</label>
                       <input
                        id="address"
                        name="address"
                        type="text"
                        value={settingsForm.address}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>

                    {/* Row 6 */}
                     <div className="flex flex-col gap-1">
                      <label htmlFor="nextOfKinName" className="font-medium">Next of Kin's name</label>
                       <input
                        id="nextOfKinName"
                        name="nextOfKinName"
                        type="text"
                        value={settingsForm.nextOfKinName}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>
                     <div className="flex flex-col gap-1">
                      <label htmlFor="nextOfKinPhone" className="font-medium">Phone number</label>
                       <input
                        id="nextOfKinPhone"
                        name="nextOfKinPhone"
                        type="text"
                        value={settingsForm.nextOfKinPhone}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Null" // Added placeholder
                      />
                    </div>

                    {/* Row 7 */}
                     <div className="flex flex-col gap-1">
                      <label htmlFor="class" className="font-medium">Class</label>
                       <input
                        id="class"
                        name="class"
                        type="text"
                        value={settingsForm.class}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Basic four white" // Added placeholder
                      />
                    </div>
                     {/* Empty div to maintain grid structure */}
                     <div></div>

                     {/* Row 8 */}
                     <div className="flex flex-col gap-1">
                      <label htmlFor="password" className="font-medium">Password</label>
                       <input
                        id="password"
                        name="password"
                        type="password" // Use type="password" for password fields
                        value={settingsForm.password}
                        onChange={handleInputChange}
                         className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         placeholder="Password" // Added placeholder
                      />
                    </div>
                    {/* Empty div to maintain grid structure */}
                    <div></div>

                     {/* Save Button */}
                     <div className="md:col-span-2 flex justify-end mt-4"> {/* Span both columns and align right */}
                        <button
                            onClick={handleSaveSettings}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 10h10v2H5v-2zm0-7h10v2H5V7zm0-4h10v2H5V3z" />
                            </svg> {/* Save icon placeholder */}
                            Save
                        </button>
                     </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
