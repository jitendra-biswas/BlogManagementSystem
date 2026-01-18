import React from 'react'
import SideNav from '../components/SideNav'
import axios from 'axios'

const Profile = () => {
  axios.get(
  "http://localhost:3000/user/profile",
  { withCredentials: true }   // ✅ cookie will be sent
)
.then(res => {
  console.log(res.data);
})
.catch(err => {
  console.log(err.response?.data || err.message);
});

  return (
   <>
     <div className='flex'>
          <SideNav />
      <div className='right w-[80%] min-h-screen pt-25 p-10'>
      
    </div>
     </div>
   </>
  )
}

export default Profile
