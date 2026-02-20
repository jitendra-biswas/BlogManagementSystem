import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileNav from "./profileNav";
import logo from '../assets/logo.png'

const LoginedNav = () => {
  const [sideNavVisiblility, setSideNavVisibility] = useState("hidden");
  const [profileCardVisible, setProfileCardVisible] = useState("hidden");
  const navigate = useNavigate();

  // Toggle SideNav
  function showSideNav() {
    setSideNavVisibility(prev => prev === "hidden" ? "visible" : "hidden");
  }

  // Toggle profile card
  function profileCard() {
    setProfileCardVisible(prev => prev === "hidden" ? "visible" : "hidden");
  }

  // Hide SideNav on link click (mobile)
  function handleLinkClick() {
    setSideNavVisibility("hidden");
  }

  return (
    <>
      {/* navigation bar */}
      <nav className="fixed left-0 top-0 z-30 bg-white w-full flex h-18 items-center justify-between py-3 px-14 border-b-2 border-b-gray-600/10 max-md:px-8">
        <div className="left flex items-center gap-5">
          <i
            onClick={showSideNav}
            className="ri-menu-line text-xl md:hidden max-md:visible cursor-pointer active:scale-90"
          ></i>

          <div className="logo flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" loading="lazy" className="w-8" />
            <h2 className="font-logo text-xl">Quillify</h2>
          </div>
        </div>

        <div className="right flex">
          <button
            onClick={() => navigate("/dashboard/blogEditor")}
            className="text-gray-500 px-5 py-1.5 pb-2 rounded-full text-md font-medium cursor-pointer max-md:hidden"
          >
            <i className="ri-file-edit-line mr-1"></i>Write
          </button>

          <div className="profile w-8 h-8 rounded-full overflow-hidden cursor-pointer" onClick={profileCard}>
            <img
              src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
              className="w-full h-full object-cover object-center"
              alt=""
            />
          </div>
        </div>

        <ProfileNav visible={profileCardVisible} />
      </nav>

      {/* for Small screen Side Nav*/}
      <div
        className={`sideNav max-md:fixed md:hidden mt-18 pt-5 pl-15 min-h-screen w-75 max-md:w-[40%] max-sm:w-64 border-r-zinc-600/10 border-r-2 max-md:${sideNavVisiblility} bg-white z-10`}
      >
        <div className="flex flex-col w-full">
          <Link
            to="/dashboard"
            onClick={handleLinkClick}
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-speed-up-line"></i> Dashboard
          </Link>

          <Link
            to="/dashboard/dashboardblogs"
            onClick={handleLinkClick}
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-file-pdf-2-line"></i> Blogs
          </Link>

          <Link
            to="/dashboard/blogEditor"
            onClick={handleLinkClick}
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-file-edit-line mr-1"></i> Write
          </Link>

          <h2 className="mt-30 px-3 mb-2 text-gray-600 font-semibold">Settings</h2>

          <Link
            to="/dashboard/editProfile"
            onClick={handleLinkClick}
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-user-line"></i> Edit Profile
          </Link>

          <Link
            to="/dashboard/changePassword"
            onClick={handleLinkClick}
            className="w-full py-3 px-2 text-gray-500 hover:bg-[#F0F0F0] rounded-l hover:border-r-2 hover:border-r-zinc-500"
          >
            <i className="ri-lock-line"></i> Change Password
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginedNav;