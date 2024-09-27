import React from "react";
import Sidebar from "../components/Sidebar";
import Flag from "react-world-flags";

function Courses() {
  return (
    <div className="h-screen flex">
      <Sidebar />

      <div className="w-full text-center pt-10 ps-8">
        <h1 className="roboto-bold text-2xl mb-8">Language courses for you.</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}

          <div className="flex flex-col justify-center items-center text-center py-10 px-5 rounded-lg shadow border-2 cursor-pointer hover:bg-gray-100">
            <Flag code="US" className="w-3/4" />
            <p className="noto-serif-bold mt-2 mb-1">English</p>
            <p className="noto-serif-regular text-sm">48.3M Learners</p>
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default Courses;
