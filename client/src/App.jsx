import React, { useState } from 'react'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import JoinUs from './components/JoinUs'
import SignIn from './components/SignIn'
import BlogEditor from './pages/BlogEditor'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Blogs from './pages/Blogs'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Homepage />}/>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/joinus' element={<JoinUs />} />
     
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/blogEditor' element={<BlogEditor />} />
      <Route path='/blogs' element={<Blogs />}/>
      <Route path='/editProfile' element={<EditProfile />}/>
      
      
    </Routes>
    </>
  )
}

export default App
