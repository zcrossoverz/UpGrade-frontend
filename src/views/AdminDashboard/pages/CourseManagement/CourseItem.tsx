import React from "react";
import placeHolderCourseImg from "../../../../assets/placeholder_course.jpg";

function CourseItem() {
  return (
    <div className='flex border-[1px] border-gray-200 mt-4 select-none z-10'>
      <div>
        <img
          src={placeHolderCourseImg}
          alt='placeholder-course'
          className='h-28 w-32'
        />
      </div>
      <div className='relative group flex flex-col w-full justify-between pl-6 pt-2 hover:text-gray-100'>
        <div className='absolute group inset-0 bg-gray-200 bg-opacity-0 h-full text-black hover:bg-opacity-10'>
          <div className='flex justify-center h-full items-center flex-col hidden group-hover:flex'>
            <button className='hover:text-violet-700 text-lg font-semibold'>
              Chỉnh sửa/Quản lý khóa học
            </button>
            <button className='hover:text-red-700 text-lg font-semibold mt-2'>
              Xóa khóa học
            </button>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='text-lg font-semibold'>Typescript cơ bản</p>
          <p className='mr-4'>30/12/2012</p>
        </div>
        <div className='text-sm'>0 học viên đăng ký</div>
        <div className='text-sm'>Chưa có đánh giá</div>
        <div className='mb-2'>
          <p className='text-gray-600 font-semibold group-hover:text-gray-100'>
            Bản nháp
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
