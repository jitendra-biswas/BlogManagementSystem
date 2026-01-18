import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [ShowSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false)

  function searchState() {
    setShowSearch(!ShowSearch);
  }

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

      <div className="right flex">
        <button className="text-gray-500 px-5 py-1.5 pb-2 rounded-full text-md font-medium cursor-pointer max-md:hidden ">
          <i className="ri-file-edit-line mr-1"></i>Write
        </button>

       {isLogin 
       ? 
       <div className="profile w-8 h-8 rounded-full overflow-hidden">
        <img src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          className="w-full h-full object-cover object-center"
        alt="" />
       </div> 
       :  
       <div className="flex gap-3">
          <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className={`outline-none bg-[#F0F0F0]  h-10 rounded-full px-2 pl-5 ${
              ShowSearch ? "block" : "hidden"
            }`}
          />
          <i
            className="ri-search-line w-10 h-10 flex items-center justify-center bg-zinc-200 rounded-full cursor-pointer text-gray-500 md:hidden "
            onClick={searchState}
          ></i>
        </div>

        <button
          onClick={() => navigate("/signin")}
          className="bg-gray-900 hover:bg-[#F0F0F0] hover:text-black hover:outline-1 transition-all text-white px-5 py-1.5 pb-2 rounded-full text-sm font-medium cursor-pointer max-md:w-23 max-md:py-2 max-md:pb-2.5 active:scale-95"
        >
          Sign In
        </button>

        <button
        onClick={()=>navigate("/joinus")}
        className="bg-[#F0F0F0] hover:outline-1 text-black px-5 py-1.5 pb-2 rounded-full text-sm font-medium max-md:hidden cursor-pointer active:scale-95" 
        >
          Sign Up
        </button>
      </div>}

      
      </div>
    </nav>
  );
};

export default Navbar;
