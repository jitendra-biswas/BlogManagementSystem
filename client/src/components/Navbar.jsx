import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileNav from "./profileNav";
import logo from '../assets/logo.png'

const Navbar = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [profileCardVisible, setprofileCardVisible] = useState("hidden");
  const navigate = useNavigate();


  return (
    <>

    {/* navigation bar */}
      <nav className="fixed z-30 bg-white w-full flex h-18 items-center justify-between py-3 px-20 border-b-2 border-b-gray-600/10 max-md:px-8">
        <div className="left flex items-center gap-5">
          <div className="logo flex items-center">
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              className="w-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <h2 className="md:hidden max-md:visible font-logo text-xl">
              Quillify
            </h2>
          </div>

          <div className=" relative max-md:hidden">
            <i className="ri-search-line text-gray-500 absolute left-3 mt-2 "></i>
            <input
              type="text"
              placeholder="Search"
              value={SearchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className={`outline-none bg-[#F0F0F0]  h-10 rounded-full px-2 pl-10  `}
            />
          </div>
        </div>

        <div className="right flex">
          
            <div className="flex gap-3">
              <div className="flex items-center gap-2">

              <button
                onClick={() => navigate("/signin")}
                className="bg-gray-900 hover:bg-[#F0F0F0] hover:text-black hover:outline-1 transition-all text-white px-5 py-1.5 pb-2 rounded-full text-sm font-medium cursor-pointer max-md:w-23 max-md:py-2 max-md:pb-2.5 active:scale-95"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-[#F0F0F0] transition-all text-gray-900 hover:bg-[#e5e5e9] hover:outline-1  px-5 py-1.5 pb-2 rounded-full text-sm font-medium cursor-pointer max-md:w-23 max-md:py-2 max-md:pb-2.5 active:scale-95"
              >
                Sign Up
              </button>

            </div>
        
        </div>
        </div>

        <ProfileNav visible={profileCardVisible}/>
      </nav>
      
    </>
  );
};

export default Navbar;
