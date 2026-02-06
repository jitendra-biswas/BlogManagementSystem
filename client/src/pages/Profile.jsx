import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const Profile = () => {
    const navigate = useNavigate();

  useEffect(() => {
      
  }, [])
  
    
  return (
    <>
    <div className='pt-20 w-full h-screen flex'>
      <div className="left pl-30  w-[70%] h-full ">
        <p className='border-b-2 border-b-zinc-500 w-fit py-2'>Blog Published</p>
        <div className="blogs w-full h-full py-3">
            <button className='w-3/4 px-3 py-2 bg-gray-300 rounded-full'>No Blogs Published Yet</button>
        </div>
      </div>
      <div className="right w-[30%] h-full border-l-2 border-l-gray-600/10 pl-8 pt-10 flex flex-col gap-3">
        <div className="profile w-20 h-20 rounded-full overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                className="w-full h-full object-cover object-center"
                alt=""
              />
            </div>
        <p className='w-full text-xl text-zinc-700 font-semibold'>@admin</p>
        <p className='w-full text-md text-zinc-700 -mt-2'>@admin223</p>
        <p className='text-zinc-500'>0 posts</p>
        <button onClick={()=>navigate("/editProfile")} className='w-fit px-3 py-2 rounded bg-[#F0F0F0] mt-3 text-sm font-semibold text-zinc-700 active:scale-95 cursor-pointer hover:bg-zinc-200'>Edit Profile</button>
        <p className='text-zinc-700'>Nothing to read here...</p>


      </div>
    </div>
    </>
  )
}

export default Profile
