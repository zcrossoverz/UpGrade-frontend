import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import AccountSetting from "./AccountSetting";
import SecuritySetting from "./SecuritySetting";
import NotificationSetting from "./NotificationSetting";

function Setting() {
  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-16 pt-28'>
        <div className='grid grid-cols-8 gap-4 mb-12'>
          <div className='col-span-2'>
            <div className='text-3xl font-medium px-8 my-2'>Thiết lập</div>
            <div className='grid pl-8 pr-4 py-2 gap-y-1'>
              <button className='bg-violet-200 py-3 rounded-md'>
                Cài đặt tài khoản
              </button>
              <button className='bg-violet-200 py-3 rounded-md'>
                Bảo mật và đăng nhập
              </button>
              <button className='bg-violet-200 py-3 rounded-md'>
                Cài đặt thông báo
              </button>
            </div>
          </div>
          <div className='col-span-6'>
            <NotificationSetting />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Setting;
