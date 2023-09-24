import React from "react";

function SecuritySetting() {
  return (
    <div>
      <h1 className='text-xl font-semibold mb-8'>Bảo mật tài khoản</h1>
      <div className='mb-8'>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <div className='font-semibold'>Email</div>
            <div className='mt-2'>
              <input
                type='text'
                className='text-sm w-2/3 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
                value={"pro356vn@gmail.com"}
                disabled={true}
              />
              <p className='text-sm mt-2 text-red-600'>Email chưa xác thực</p>
            </div>
          </div>
          <div>
            <button className='border px-4 py-2 rounded-3xl text-gray-400 text-sm'>
              Chỉnh sửa
            </button>
          </div>
        </div>
      </div>

      <div className='mb-8'>
        <div className='font-semibold'>Mật khẩu</div>
        <div className='mt-2'>
          <input
            type='password'
            className='text-sm w-80 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
            placeholder='Nhập mật khẩu cũ'
          />
        </div>
        <div className='mt-2'>
          <input
            type='password'
            className='text-sm w-80 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
            placeholder='Nhập mật khẩu mới'
          />
        </div>
        <div className='mt-2'>
          <input
            type='password'
            className='text-sm w-80 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
            placeholder='Nhập lại mật khẩu mới'
          />
        </div>
        <button className='mt-6 border px-4 py-1 rounded-3xl text-red-600 border-red-600 text-sm'>
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

export default SecuritySetting;
