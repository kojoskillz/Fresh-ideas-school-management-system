"use client";
import Image from "next/image";

import AdminLayout from "../../../components/layouts/admin";
import { Avatar } from "@mui/material";
import CurvedSvg from "@/components/svgs/CurvedSvg";

export default function Page() {
  return (
    <AdminLayout page="Admin">
      <div className="flex bg-primary-foreground flex-col gap-4 p-4 h-full">
        <div className="bg-[#A926C7] p-5 md:p-10 flex flex-col sm:flex-row justify-between gap-6 rounded-xl">
          <div className="">
            <h2 className="text-lg font-bold text-white">
              HELLO, MRS FLORENCE IDOWU
            </h2>
            <span className="text-sm font-semibold text-white">
              Junior sectional Head
            </span>
          </div>
          <div className="flex flex-col items-center">
            <div className="">
              <CurvedSvg />
            </div>
            <div className="">
              <Image
                src="/img4.png"
                width={200}
                height={200}
                alt=""
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-white aspect-vide rounded-xl h-full p-4">
            <h1 className="text-xl text-primary font-semibold mb-4">
              Sections
            </h1>
            <div>
              <ul className="">
                {[
                  "Basic 1",
                  "Basic 2",
                  "Basic 3",
                  "Basic 4",
                  "Basic 5",
                  "Basic 6",
                ].map((item) => (
                  <li className="text-gray-600 py-1" key={item}>
                    {" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className=" bg-white aspect-vide rounded-xl h-full p-4">
            <div className="flex items-center justify-between">
              <h1 className="mb-4 text-xl text-primary font-semibold">
                Staff Birthday
              </h1>
              <Image
                src="/img2.png"
                width={50}
                height={50}
                alt="Birthday cake"
              />
            </div>
            <div className="flex">
              <span className="text-gray-600">
                No colleague&apos;s birthday today
              </span>
            </div>
          </div>

          <div className=" bg-white aspect-vide rounded-xl h-full p-4">
            <div className="flex justify-between items-center">
              <h1 className="mb-4 text-xl text-primary font-semibold">
                Students Birthday
              </h1>
              <Image
                src="/img2.png"
                width={50}
                height={50}
                alt="Birthday cake"
              />
            </div>
            <div className="space-y-2">
              {[
                {
                  name: "John Doe",
                },
                {
                  name: "Florence John",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-2 items-center py-1">
                  <Avatar />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
