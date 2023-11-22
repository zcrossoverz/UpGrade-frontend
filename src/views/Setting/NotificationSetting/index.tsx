import { Switch } from "@/components/ui/switch";
import React from "react";

function NotificationSetting() {
  return (
    <div>
      <h1 className='text-xl font-semibold mb-8'>Cài đặt thông báo</h1>
      <div className='mb-8'>
        <div className='font-semibold'>Email</div>
        <div className='mt-2'>
          <div className='ml-4 grid grid-cols-2'>
            <div>Thông báo khi có bài học mới</div>
            <div>
              <Switch checked />
            </div>
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <div className='font-semibold'>Thông báo</div>
        <div className='mb-8'>
          <div className='mt-2'>
            <div className='mb-4 mt-2'>Thông báo khi có</div>
            <div className='ml-4 grid grid-cols-2'>
              <div className='ml-2 mb-2'>Bài học mới</div>
              <div>
                <Switch checked />
              </div>
            </div>
            <div className='ml-4 grid grid-cols-2'>
              <div className='ml-2 mb-2'>Trả lời bình luận</div>
              <div>
                <Switch checked />
              </div>
            </div>
            <div className='ml-4 grid grid-cols-2'>
              <div className='ml-2 mb-2'>Cảm xúc bình luận</div>
              <div>
                <Switch checked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationSetting;
