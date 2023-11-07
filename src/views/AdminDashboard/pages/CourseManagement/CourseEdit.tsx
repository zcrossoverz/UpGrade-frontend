/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import { useGetCourse } from "@/hooks/useCourse";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";

function CourseEdit() {
  const { course_id } = useParams();
  const { isLoading, data } = useGetCourse(Number(course_id));
  console.log(data);

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
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
              <Loader />
            </div>
          ) : data.units.length > 0 ? (
            <div className='flex justify-center mt-6 w-full'>
              <Table
                data={data.units.map(
                  (
                    e: {
                      title: string;
                      updated_at: string;
                      created_at: string;
                      topics: any[];
                    },
                    i: number
                  ) => ({
                    order: (i + 1).toString(),
                    title: e.title,
                    updateDate: e.updated_at,
                    createDate: e.created_at,
                    numberTopics: e.topics.length,
                  })
                )}
                headerLabel={[
                  {
                    key: "order",
                    title: "#",
                  },
                  {
                    key: "title",
                    title: "Tiêu đề",
                  },
                  {
                    key: "numberTopics",
                    title: "Số chủ đề",
                  },
                  {
                    key: "updateDate",
                    title: "CẬP NHẬT LÚC",
                  },
                  {
                    key: "createDate",
                    title: "KHỞI TẠO LÚC",
                  },
                ]}
              />
            </div>
          ) : (
            <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
              <p className='text-gray-600'>Chưa có bài học nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseEdit;
