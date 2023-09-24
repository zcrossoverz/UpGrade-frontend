import React from "react";

function AccountSetting() {
  return (
    <div>
      <h1 className='text-xl font-semibold mb-8'>Thông tin cá nhân</h1>
      <div className='mb-8'>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <div className='font-semibold'>Tên</div>
            <div className='mt-2'>
              <input
                type='text'
                className='text-sm w-2/3 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
                value={"Nhan"}
                disabled={true}
              />
            </div>
          </div>
          <div>
            <button className='border px-4 py-2 rounded-3xl text-gray-400 text-sm'>
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div>
          <p className='text-gray-400 text-sm mt-4'>Tên của bạn.</p>
        </div>
      </div>

      <div className='mb-8'>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <div className='font-semibold'>Họ</div>
            <div className='mt-2'>
              <input
                type='text'
                className='text-sm w-2/3 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
                value={"Nhan Nguyen"}
                disabled={true}
              />
            </div>
          </div>
          <div>
            <button className='border px-4 py-2 rounded-3xl text-gray-400 text-sm'>
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div>
          <p className='text-gray-400 text-sm mt-4'>Họ và tên lót của bạn.</p>
        </div>
      </div>

      <div className='mb-8'>
        <div className='grid grid-cols-4'>
          <div className='col-span-3'>
            <div className='font-semibold'>Giới thiệu</div>
            <div className='mt-2'>
              <input
                placeholder='Thêm giới thiệu'
                type='text'
                className='text-sm w-2/3 py-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white'
                // value={"Nhan Nguyen"}
                disabled={true}
              />
            </div>
          </div>
          <div>
            <button className='border px-4 py-2 rounded-3xl text-gray-400 text-sm'>
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div>
          <p className='text-gray-400 text-sm mt-4'>
            Bio hiển thị trên trang cá nhân.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountSetting;
