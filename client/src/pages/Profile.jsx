import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import NoBlogsYet from "../components/NoBlogsYet"
const Profile = () => {
    const navigate = useNavigate();
    const [User, setUser] = useState("")
    const [Handle, setHandle] = useState("")
    const [Bio, setBio] = useState("");
    const [ProfileImage, setProfileImage] = useState("")

    useEffect(() => {
      if (User) {
        setHandle(User.handle) 
        setBio(User.bio)
        setProfileImage(User.profileImage)
      }
    }, [User]);

  useEffect(() => {
         axios.get("http://localhost:3000/api/auth/getUsers",{withCredentials:true}).then(res=>{
          setUser(res.data.user);
         })
      }, [])
  
    
  return (
    <>
    <div className='pt-20 w-full h-screen flex'>
      <div className="left pl-30  w-[70%] h-full ">
        <p className='border-b-2 border-b-zinc-500 w-fit py-2'>Blog Published</p>
        <NoBlogsYet />
      </div>
      <div className="right w-[30%] h-full border-l-2 border-l-gray-600/10 pl-8 pt-10 flex flex-col gap-3">
        <div className="profile w-20 h-20 rounded-full overflow-hidden cursor-pointer">
              <img
                src={ProfileImage? ProfileImage : "https://plus.unsplash.com/premium_photo-1723677830933-4a9d84d17b4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"}
                className="w-full h-full object-cover object-center"
                alt=""
              />
            </div>
        <p className='w-full text-xl text-zinc-700 font-semibold'>{Handle}</p>
        <button onClick={()=>navigate("/dashboard/editProfile")} className='w-fit px-3 py-2 rounded bg-[#F0F0F0] mt-3 text-sm font-semibold text-zinc-700 active:scale-95 cursor-pointer hover:bg-zinc-200'>Edit Profile</button>
        <p className='text-zinc-700'>{Bio?Bio:"Nothing to read here..."}</p>


      </div>
    </div>
    </>
  )
}

export default Profile
