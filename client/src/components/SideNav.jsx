import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <>
      <div className="sideNav pt-20 pl-15 max-lg:pl-7 min-h-screen w-80 max-lg:w-82 border-r-zinc-600/10 border-r-2 max-md:hidden bg-white">
        
        <div className="flex flex-col w-full">
          <Link
            to="/dashboard"
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-speed-up-line"></i> Dashboard
          </Link>
          <Link
            to="/dashboard/dashboardblogs"
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-file-pdf-2-line"></i> Blogs
          </Link>
          <Link
            to="/dashboard/blogEditor"
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-file-edit-line mr-1"></i> Write
          </Link>

          <h2 className="mt-30 px-3 mb-2 text-gray-600 font-semibold">
            Settings
          </h2>
          <Link
            to="/dashboard/editProfile"
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-user-line"></i> Edit Profile
          </Link>
          <Link
            to="/dashboard/editProfile"
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-lock-line"></i> Change Password
          </Link>
        </div>
      </div>

     
    </>
  );
};

export default SideNav;
