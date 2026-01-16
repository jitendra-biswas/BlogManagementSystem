import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardNav = () => {
  const navigate = useNavigate();



  return (
    <nav className="fixed bg-white w-full flex h-18 items-center justify-between py-3 px-14 border-b-2 border-b-gray-600/10 max-md:px-3">
      <div className="left flex items-center gap-3">
        <div className="logo">
          <img src="./logo.png" alt="logo" className="w-8 cursor-pointer" onClick={()=>navigate("/")}/>
        </div>

        <div className=" relative max-md:hidden">
          <i
            className="ri-search-line text-gray-500 absolute left-3 mt-2 "
          ></i>
          <input
            type="text"
            placeholder="Search"
            className={`outline-none bg-[#F0F0F0]  h-10 rounded-full px-2 pl-10  `}
          />
          
        </div>
      </div>

      <div className="right flex items-center ">
        <button className="text-gray-500 px-5 py-1.5 pb-2 rounded-full text-md font-medium cursor-pointer max-md:hidden ">
          <i className="ri-file-edit-line mr-1"></i>Write
        </button>

        <div className="profile w-8.5 h-8.5 rounded-full object-cover object-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt=""
                 className='w-full h-full'
                />
        </div>

        
      </div>
    </nav>
  );
};

export default DashboardNav;
