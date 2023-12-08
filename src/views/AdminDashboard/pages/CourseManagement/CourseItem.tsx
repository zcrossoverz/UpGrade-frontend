/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatTime } from "@/utils/time";
import ModalDelete from "@/components/ModalDelete";
import { useDeleteCourse } from "@/hooks/useCourse";

function CourseItem({
  data,
}: {
  data: {
    thumbnail_url: string;
    description: string;
    title: string;
    updated_at: string;
    status: string;
    id: number;
    members_count: number;
  };
}) {
  const { thumbnail_url, title, updated_at, id, status, members_count } = data;
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    course_id: -1,
    title: "",
  });
  const deleteCourseHook = useDeleteCourse();

  const navigate = useNavigate();

  return (
    <div className='flex border-[1px] border-gray-200 mt-4 select-none z-10'>
      {modalDelete.isOpen && (
        <ModalDelete
          title={modalDelete.title}
          handleClose={() =>
            setModalDelete({
              isOpen: false,
              course_id: -1,
              title: "",
            })
          }
          handleSubmit={async () => {
            await deleteCourseHook.mutateAsync({
              course_id: modalDelete.course_id,
            });
            setModalDelete({
              isOpen: false,
              course_id: -1,
              title: "",
            });
          }}
          isLoading={deleteCourseHook.isLoading}
        />
      )}
      <div>
        <LazyLoadImage
          alt='placeholder-course'
          height={110}
          width={234}
          src={`http://localhost:3000/proxy/?image=${thumbnail_url}`}
        />
      </div>
      <div className='relative group flex flex-col w-full justify-between pl-6 pt-2 hover:text-gray-100'>
        <div className='absolute group inset-0 bg-gray-200 bg-opacity-0 h-full text-black hover:bg-opacity-10'>
          <div className='flex justify-center h-full items-center flex-col hidden group-hover:flex'>
            <button
              className='hover:text-violet-700 text-lg font-semibold'
              onClick={() => navigate(`/admin/course-management/details/${id}`)}
            >
              Chỉnh sửa/Quản lý khóa học
            </button>
            <button
              className='hover:text-blue-700 text-lg font-semibold mt-2'
              onClick={() => navigate(`/admin/course-management/edit/${id}`)}
            >
              Nội dung khóa học
            </button>
            <button
              className='hover:text-red-700 text-lg font-semibold mt-2'
              onClick={() => {
                setModalDelete({
                  isOpen: true,
                  title: `Xóa ${title}`,
                  course_id: id,
                });
              }}
            >
              Xóa khóa học
            </button>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='text-lg font-semibold'>{title}</p>
          <p className='mr-4'>{formatTime(updated_at)}</p>
        </div>
        <div className='text-sm'>{members_count} học viên đăng ký</div>
        <div className='text-sm'>Chưa có đánh giá</div>
        <div className='mb-2'>
          {status === "draft" && (
            <p className='text-gray-600 font-semibold group-hover:text-gray-100'>
              Bản nháp
            </p>
          )}
          {status === "published" && (
            <p className='text-green-600 font-semibold group-hover:text-green-100'>
              Công khai
            </p>
          )}
          {status === "private" && (
            <p className='text-blue-700 font-semibold group-hover:text-blue-100'>
              Riêng tư
            </p>
          )}
          {status === "block" && (
            <p className='text-red-600 font-semibold group-hover:text-red-100'>
              Bị khóa
            </p>
          )}
          {status === "rejected" && (
            <p className='text-red-600 font-semibold group-hover:text-red-100'>
              Đã bị từ chối xét duyệt
            </p>
          )}
          {status === "submitted" && (
            <p className='text-cyan-600 font-semibold group-hover:text-cyan-100'>
              Đang chờ xét duyệt
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
