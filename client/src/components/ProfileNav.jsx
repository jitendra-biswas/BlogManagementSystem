import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ProfileNav = (props) => {
    const [profileVisible, setprofileVisible] = useState("");
    function signOut(){
      document.cookie = `success=`;
      window.location.reload();
    }
  return (
   <>
    <div className={`profileNav fixed z-20 right-16 rounded top-14 pb-10 border-2 border-zinc-300/10 w-60 bg-[#fbfbfb] flex flex-col ${props.visible} ${profileVisible}`}>
        <Link to="/dashboard/profile" onClick={()=>{profileVisible("hidden")}} className='w-full h-12 flex items-center px-6 hover:bg-zinc-200 text-gray-500'>Profile</Link>
        <Link to="/dashboard"  onClick={()=>{profileVisible("hidden")}} className='w-full h-12 flex items-center px-6 hover:bg-zinc-200 text-gray-500'>Dashboard</Link>
        <hr className='text-zinc-300'/>
        <button onClick={signOut} className='w-full py-3 flex items-center gap-2 px-6 hover:bg-zinc-200 cursor-pointer active:bg-zinc-400'>SignOut <i className="ri-logout-box-r-line"></i></button>
        <p className='w-full px-6 text-sm text-gray-400'>tanish124@</p>
    </div>
   </>
  )
}

export default ProfileNav
