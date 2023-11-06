import React from "react";
import { BsSearch } from "react-icons/bs";

function CourseEdit() {
  return (
    <div>
      <h1 className='-mt-4'>Chỉnh sửa khóa học</h1>
      <div className='bg-white px-4 py-8 mt-4 shadow-md rounded-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <div className='border flex'>
              <input
                type='text'
                className='py-[8px] px-4 outline-0'
                placeholder='Tìm kiếm bài học'
              />
              <button className='px-3 bg-gray-600 text-white h-[40px] text-md'>
                <BsSearch />
              </button>
            </div>
            <div className='ml-4 flex'>
              <select className='border px-2 py-1 text-sm pr-8'>
                <option value='ASC'>Mới nhất</option>
                <option value='DESC'>Cũ nhất</option>
              </select>
            </div>
          </div>
          <div>
            <button className='bg-violet-600/80 text-white py-[8px] px-3'>
              Thêm chương mới
            </button>
          </div>
        </div>
        <div className='mt-8 min-h-[350px]'>
          <hr className='-mt-6' />
          <div className='flex justify-center items-center min-h-[200px]'>
            <p className='text-gray-600'>Chưa có bài học nào</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseEdit;
