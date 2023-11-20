import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import CourseItem from "./CourseItem";
import CreateCourseModal from "./courses/CreateCourseModal";
import { useGetListCourses } from "@/hooks/useCourse";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

function CourseManagement() {
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  const authHook = useAuth();

  const { user_id } = useParams();

  const { data, isLoading, remove } = useGetListCourses(
    {
      ...(authHook?.isAdmin
        ? {}
        : {
            explicit: [
              {
                key: "instructor_id",
                value: user_id,
              },
            ],
          }),
    },
    "course_management"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!authHook.isLoading && authHook?.isAdmin === false && !user_id) {
      navigate("/");
      remove();
    }
  }, [authHook]);

  return (
    <div>
      <div className='px-4 py-4 bg-white shadow-sm rounded-sm min-h-[500px]'>
        <CreateCourseModal
          isPopupOpen={showCreateCourseModal}
          handleClose={() => setShowCreateCourseModal(false)}
        />
        <div className='flex justify-between items-center mt-4'>
          <div className='flex'>
            <div className='border flex'>
              <input
                type='text'
                className='py-[8px] px-4 outline-0'
                placeholder='Tìm kiếm khóa học'
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
            <button
              className='bg-violet-600/80 text-white py-[8px] px-3'
              onClick={() => setShowCreateCourseModal(true)}
            >
              Khóa học mới
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className='relative flex justify-center items-center min-h-[200px] mt-8'>
            <Loader />
          </div>
        ) : (
          <>
            {data?.count > 0 ? (
              <div className='mt-8 min-h-[450px]'>
                {data &&
                  data.datas.map(
                    (
                      data: {
                        thumbnail_url: string;
                        description: string;
                        title: string;
                        updated_at: string;
                        id: number;
                        status: string;
                        members_count: number;
                      },
                      i: number
                    ) => <CourseItem key={i.toString()} data={data} />
                  )}
              </div>
            ) : (
              <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
                <p className='text-gray-600'>Chưa có nội dung nào</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;
