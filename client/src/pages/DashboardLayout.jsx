import React from "react";
import SideNav from '../components/SideNav'
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <div className="flex w-full min-h-screen ">
          <SideNav />
          <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
