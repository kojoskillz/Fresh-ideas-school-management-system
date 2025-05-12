"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import AdminLayout from "@/components/layouts/admin";

export default function Page() {
  const [name, setName] = useState("");
  const [schoolname, setSchoolName] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem("userName", name); // Store name in local storage
    router.push("/dashboard"); // Redirect to dashboard page
  };

  return (
    <AdminLayout page="Profile">
      <div className="flex flex-1 bg-gray-300 flex-col  gap-4 p-4">
        <div className="flex gap-4 m-auto">
          {/* container1 */}
          <div className="h-[28rem] w-[17rem] rounded-md bg-white ">
            <div className="rounded-full bg-gray-300 h-16 w-16 mt-5 m-auto"></div>
            <div className="flex  mt-6 place-content-center">
              <button className="text-center h-8 place-content-center m-auto  bg-gray-300 p-1 border-1 border-slate-900/10 font-semibold">
                Choose a file
              </button>
              <h1 className="text-center ml-[-1rem] h-8 place-content-center m-auto   p-1 border-1 border-slate-900/5 font-semibold">
                No file chosen
              </h1>
            </div>

            <div className="grid place-content-center m-auto mt-6">
              <button className="text-center grid place-content-center hover:bg-red-600/90 cursor-pointer m-auto rounded-md w-[7rem] h-10  text-white bg-red-500 p-1 border-1 border-slate-900/10 font-semibold">
                Upload
              </button>
              <h1 className="text-center font-semibold">MISS JANE FRANCIS</h1>

              <div className="flex gap-2 mt-5 font-semibold">
                <h1>Admission number:</h1>
                <h2 className="text-gray-400">0000</h2>
              </div>

              <div className="flex gap-2 font-semibold">
                <h1>Class:</h1>
                <h2 className="text-gray-400">basic 3</h2>
              </div>

              <div className="flex gap-2 font-semibold">
                <h1>Category:</h1>
                <h2 className="text-gray-400">Day</h2>
              </div>

              <div className="flex gap-2 font-semibold">
                <h1>Address:</h1>
                <h2 className="text-gray-400">EN-002-222</h2>
              </div>
            </div>

            {/* forms (contains details of students to be uploaded) */}
          </div>

          {/* container2 */}
          <div className="h-[28rem] w-[34rem] rounded-md bg-white ">
            <div className="flex m-auto place-content-center mt-4 gap-3">
              <button className="bg-blue-400 w-[16rem] text-white rounded-sm">
                About
              </button>
              <button className="bg-blue-200 w-[16rem] rounded-sm">
                Settings
              </button>
            </div>
            <div>
              <h1 className="m-3">Personal Profile</h1>
              <h1 className="m-1 text-sm">
                Below is the personal profile of information of the student.All
                you need to know about the students (address,phone
                number,parents name etc)
              </h1>
              {/* details of students */}
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="grid">
                  <h1 className="font-bold text-sm">Fullname:</h1>
                  <h1 className="font-bold">MISS JANE FRANCIS</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Date of Birth:</h1>
                  <h1 className="font-semibold text-gray-400">01-03-1990</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Phone number:</h1>
                  <h1 className="font-semibold text-gray-400">+233541833813</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Password:</h1>
                  <h1 className="font-semibold text-gray-400">********</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Gender:</h1>
                  <h1 className="font-semibold text-gray-400">Female</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Religion:</h1>
                  <h1 className="font-semibold text-gray-400">Christian</h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Fathers name:</h1>
                  <h1 className="font-semibold text-gray-400">
                    Marvelous Becker
                  </h1>
                </div>

                <div className="grid">
                  <h1 className="font-bold">Mothers name:</h1>
                  <h1 className="font-semibold text-gray-400">
                    Marvelous Becker
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-bold">Enter Your Name</h1>

          <input
            type="text"
            placeholder="Type your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Type your name..."
            value={schoolname}
            onChange={(e) => setSchoolName(e.target.value)}
            className="border p-2 rounded-md"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
