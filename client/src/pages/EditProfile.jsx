import React from 'react'
import axios from 'axios'
import LoginedNav from '../components/LoginedNav';

const EditProfile = () => {
  axios.get(
  "http://localhost:3000/user/profile",
  { withCredentials: true }   // ✅ cookie will be sent
)
.then(res => {
})
.catch(err => {
  console.log(err.response?.data || err.message);
});

  return (
   <>
     <div className='flex'>
         <LoginedNav />
      <div className='right w-[80%] min-h-screen pt-25 p-10 '>
      Edit Profile
    </div>
     </div>
   </>
  )
}

export default EditProfile
