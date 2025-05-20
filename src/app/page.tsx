import React from "react";
import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="pt-12 px-6 max-w-screen-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-6">

        {/* Students section spans 2 rows on md+ with reduced height and vertical center */}
        <div className="bg-white lg:h-[16rem] lg:mt-[10rem] shadow-md rounded-lg flex flex-col md:flex-row items-center justify-center gap-4 row-span-1 md:row-span-2 p-3">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-1">Students Section</h1>
            <h3 className="text-xs font-semibold text-black/60 mb-3">
              Sign in to continue to the application
            </h3>
            <Link href="/auth/login" passHref>
              <button className="bg-blue-500 w-28 h-9 font-semibold rounded-md text-white text-xs cursor-pointer hover:bg-blue-600 transition">
                Login Now
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/img5.png"
              width={160}
              height={100}
              alt="Students"
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-[#6C75F0] shadow-md p-4 rounded-lg flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white mb-1 whitespace-nowrap">
              Teachers Section
            </h1>
            <h3 className="text-xs font-semibold text-white mb-3">
              Sign in to continue to the application
            </h3>
            <Link href="/auth/login" passHref>
              <button className="text-blue-500 bg-white w-28 h-9 font-semibold rounded-md text-xs cursor-pointer hover:bg-gray-100 transition">
                Sign in
              </button>
            </Link>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Image
              src="/img6.png"
              width={100}
              height={90}
              alt="Teacher 1"
              className="object-contain rounded-xl"
              priority
            />
            <Image
              src="/img3.png"
              width={100}
              height={90}
              alt="Teacher 2"
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>

        {/* Admin Section centered horizontally */}
        <div className="bg-[#F2426D] shadow-md p-4 rounded-lg flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white mb-1">Admin Section</h1>
            <h3 className="text-xs text-red-200 mb-3">
              Sign in to continue to the application
            </h3>
            <Link href="/auth/login" passHref>
              <button className="bg-white text-blue-400 w-28 h-9 font-semibold rounded-md text-xs cursor-pointer hover:bg-gray-100 transition">
                Login Now
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/img7.png"
              width={160}
              height={110}
              alt="Admin"
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
