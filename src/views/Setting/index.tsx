import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import AccountSetting from "./AccountSetting";
import SecuritySetting from "./SecuritySetting";
import NotificationSetting from "./NotificationSetting";

enum EnumTab {
  ACCOUNT,
  SECURITY,
  NOTIFICATION,
}

const tabList = [
  {
    title: "Cài đặt tài khoản",
    tab: EnumTab.ACCOUNT,
  },
  {
    title: "Bảo mật và đăng nhập",
    tab: EnumTab.SECURITY,
  },
  {
    title: "Cài đặt thông báo",
    tab: EnumTab.NOTIFICATION,
  },
];

function Setting() {
  const [currentTab, setTab] = useState<EnumTab>(EnumTab.ACCOUNT);

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
              {tabList.map(({ title, tab }, i) => (
                <button
                  className={`py-3 rounded-md text-left pl-8 w-68 ${
                    currentTab === tab ? "bg-gray-200" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setTab(tab)}
                  key={i.toString()}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
          <div className='col-span-6 min-h-fitscreen'>
            {currentTab === EnumTab.ACCOUNT && <AccountSetting />}
            {currentTab === EnumTab.SECURITY && <SecuritySetting />}
            {currentTab === EnumTab.NOTIFICATION && <NotificationSetting />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Setting;
