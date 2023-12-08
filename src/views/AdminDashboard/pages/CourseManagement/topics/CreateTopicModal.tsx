/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateTopic } from "@/hooks/useCourse";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

function CreateTopicModal({
  handleClose,
  index,
  unit_id,
  drive_folder_unit_id,
}: {
  handleClose: any;
  index: any;
  unit_id: number;
  drive_folder_unit_id: string;
}) {
  const [formData, setFormData] = useState({});
  const { isLoading, mutateAsync } = useCreateTopic(unit_id);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 select-none transition duration-500 ease-in-out'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative z-10 bg-white px-24 py-4 rounded-lg shadow-lg min-w-[600px]'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='absolute top-3 left-4'>
            <p className='font-semibold text-xl leading-loose'>
              Tạo bài học mới
            </p>
          </div>
          <button
            onClick={() => {
              handleClose();
            }}
          >
            <MdCancel className='absolute text-[32px] text-gray-500 hover:text-red-500 top-3 right-3' />
          </button>
        </div>

        <div className='min-w-[220px] text-[12px] text-center text-gray-500'>
          <div className='mt-12 mb-6'>
            <div>
              <p className='text-left font-medium text-md text-black'>
                Tiêu đề
              </p>
              <input
                type='text'
                defaultValue={`Bài ${index + 1}: `}
                className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div className='mt-4'>
              <p className='text-left font-medium text-black'>Mô tả</p>
              <textarea
                rows={3}
                className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className='mt-4'>
              <p className='text-left font-medium'>Upload video khóa học</p>
              <input
                type='file'
                className=' border border-gray-400 mt-2 outline-none w-full'
                onChange={(e) => {
                  const video = e.target.files;
                  if (video?.length) {
                    setFormData((prev) => ({
                      ...prev,
                      video: video[0],
                    }));
                  }
                }}
              />
            </div>
          </div>
          <div className='flex justify-end w-full'>
            <button
              onClick={() => {
                handleClose();
              }}
              className='mr-4 px-4 py-2 border border-gray-400 text-black text-md rounded-md hover:bg-gray-300 hover:shadow-md'
            >
              Hủy bỏ
            </button>
            <button
              onClick={async () => {
                await mutateAsync({
                  ...formData,
                  unit_id,
                  drive_folder_unit_id,
                });
                handleClose();
              }}
              className='px-6 py-2 border border-gray-300 text-white bg-red-400 text-md rounded-md hover:bg-red-500 hover:shadow-md'
            >
              {isLoading ? "Đang upload video..." : "Tạo mới"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTopicModal;
