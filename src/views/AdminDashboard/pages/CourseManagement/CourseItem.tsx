/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CourseItem({
  data,
}: {
  data: {
    thumbnail_url: string;
    description: string;
    title: string;
    updated_at: string;
    id: number;
  };
}) {
  const { thumbnail_url, title, updated_at, id } = data;

  const navigate = useNavigate();

  return (
    <div className='flex border-[1px] border-gray-200 mt-4 select-none z-10'>
      <div>
        <LazyLoadImage
          alt='placeholder-course'
          height={110}
          width={234}
          src={thumbnail_url}
        />
      </div>
      <div className='relative group flex flex-col w-full justify-between pl-6 pt-2 hover:text-gray-100'>
        <div className='absolute group inset-0 bg-gray-200 bg-opacity-0 h-full text-black hover:bg-opacity-10'>
          <div className='flex justify-center h-full items-center flex-col hidden group-hover:flex'>
            <button
              className='hover:text-violet-700 text-lg font-semibold'
              onClick={() => navigate(`/admin/course-management/edit/${id}`)}
            >
              Chỉnh sửa/Quản lý khóa học
            </button>
            <button
              className='hover:text-blue-700 text-lg font-semibold mt-2'
              onClick={() => navigate(`/admin/course-management/edit/${id}`)}
            >
              Nội dung khóa học
            </button>
            <button className='hover:text-red-700 text-lg font-semibold mt-2'>
              Xóa khóa học
            </button>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='text-lg font-semibold'>{title}</p>
          <p className='mr-4'>{new Date(updated_at).toDateString()}</p>
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
