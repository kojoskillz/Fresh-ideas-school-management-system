"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function VerifyEmail() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-blue-100 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-10">
        <div className="flex flex-col items-center gap-5">
          <Link href="/" passHref>
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-primary mb-2">
            Email Verification
          </h1>
        </div>
        <div className="py-4 text-center">
          <p>Email Verification Successful, You can proceed to login</p>
        </div>
        <Link href={"/auth/login"}>
          <Button className="w-full cursor-pointer">Login</Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
