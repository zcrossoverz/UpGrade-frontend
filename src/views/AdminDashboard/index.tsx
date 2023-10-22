import React from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className='bg-boxdark-2 text-bodydark'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          <div>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
