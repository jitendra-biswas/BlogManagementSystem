import React from 'react'
import LoginedNav from '../components/LoginedNav'

const DashboardBlogs = () => {
  return (
    <>
      <div className='flex'>
        <LoginedNav />
    <div className='right w-[80%] min-h-screen pt-25 p-10'>
      Dashboard blogs
    </div>
      </div>
    </>
  )
}

export default DashboardBlogs
