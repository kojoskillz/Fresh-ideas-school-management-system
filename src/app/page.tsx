import React from "react";
import Image from "next/image";
import Link from "next/link";
// import Profile from './dashboard/profile';

const Homepage = () => {
  return (
    // main container
    <>
      <div className="grid grid-flow-col grid-rows-2 pt-32 gap-4 lg:m-auto  place-content-center">
        {/* Students section */}
        <div className="bg-white h-[15rem] w-[25rem] shadow-lg p-5 row-span-2 row-start-1">
          <div className="flex">
            <div className="grid">
              <h1 className="text-md font-bold">Students Section</h1>
              <h3 className="text-md font-semibold text-black/50">
                Sign in to continue to the application
              </h3>
              <Link href="/auth/login">
                <button className="bg-blue-500  w-[7rem] h-[2.4rem] font-semibold rounded-lg text-[12px] text-white cursor-pointer">
                  Login Now
                </button>
              </Link>
            </div>
            <Image
              src="/img5.png"
              width={200}
              height={200}
              alt=""
              className="object-contain rounded-2xl h-[10rem] w-[15rem] "
            />
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-[#6C75F0] h-[15rem] w-[25rem] shadow-lg p-5">
          <div className="flex">
            <div className="grid">
              <h1 className="text-md font-bold text-white text-nowrap">
                Teachers Section
              </h1>
              <h3 className="text-md font-semibold text-white">
                Sign in to continue to the application
              </h3>
              <Link href="/auth/login">
                <button className="text-blue-500 bg-white w-[7rem] h-[2.4rem] font-semibold cursor-pointer text-[12px] rounded-lg">
                  Sign in
                </button>
              </Link>
            </div>
            {/* image here */}
            <div className="flex">
              <Image
                src="/img6.png"
                width={200}
                height={200}
                alt=""
                className="object-contain rounded-2xl h-[10rem] w-[15rem] "
              />
              <Image
                src="/img3.png"
                width={200}
                height={200}
                alt=""
                className="object-contain rounded-2xl h-[10rem] w-[15rem] "
              />
            </div>
          </div>
        </div>

        {/* Admin Section */}
        <div className="bg-[#F2426D] h-[15.3rem] w-[25rem] shadow-lg p-5 item-center justify-center m-auto place-content-center">
          <div className="flex">
            <div className="grid">
              <h1 className="text-md font-bold text-white">Admin Section</h1>
              <h3 className="text-red-200">
                Sign in to continue to the application
              </h3>
              <Link href="/auth/login">
                <button className="font-semibold rounded-lg bg-white text-blue-400 w-[7rem] cursor-pointer text-[12px] h-[2.4rem]">
                  Login Now
                </button>
              </Link>
            </div>
            <Image
              src="/img7.png"
              width={200}
              height={200}
              alt=""
              className="object-contain rounded-2xl h-[14rem] w-[15rem] "
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
