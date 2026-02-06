import React, { useState } from "react";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import JoinUs from "./components/JoinUs";
import SignIn from "./components/SignIn";
import BlogEditor from "./pages/BlogEditor";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardBlogs from "./pages/DashboardBlogs";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import BlogPage from "./pages/BlogPage";
import LoginedNav from "./components/LoginedNav";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import axios from "axios";

const App = () => {
  const success = document.cookie.split("success=")[1]?.split(";")[0];
  const [LoginStatus, setLoginStatus] = useState(success);
  

  return (
    <>
      {LoginStatus ? <LoginedNav /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/joinus" element={<JoinUs />} />
        <Route path="/blogs/:id" element={<BlogPage />} />

        <Route
          path="/dashboard"
          element={LoginStatus ? <DashboardLayout /> : <SignIn />}
        >
          <Route index element={<Dashboard />} />
          <Route path="blogEditor" element={<BlogEditor />} />
          <Route path="dashboardblogs" element={<DashboardBlogs />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
