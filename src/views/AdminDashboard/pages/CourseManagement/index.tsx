import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import CourseItem from "./CourseItem";
import CreateCourseModal from "./CreateCourseModal";

function CourseManagement() {
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  return (
    <div>
      <div className='px-4 py-4 bg-white shadow-sm rounded-sm'>
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
        <div className='mt-8 min-h-[450px]'>
          <CourseItem />
          <CourseItem />
          <CourseItem />
          <CourseItem />
        </div>
      </div>
    </div>
  );
}

export default CourseManagement;
