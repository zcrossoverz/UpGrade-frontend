/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateUnit } from "@/hooks/useCourse";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

function UpdateUnitModal({
  handleClose,
  course_id,
  data,
}: {
  handleClose: any;
  data: any;
  course_id: number;
}) {
  const [formData, setFormData] = useState({});
  const { isLoading, mutateAsync } = useUpdateUnit(course_id);

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 select-none transition duration-500 ease-in-out'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative z-10 bg-white px-24 py-4 rounded-lg shadow-lg min-w-[600px]'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='absolute top-3 left-4'>
            <p className='font-semibold text-xl leading-loose'>
              Cập nhật chương {data.title}
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
                defaultValue={data.title}
                className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            {/* <div className='mt-4'>
              <p className='text-left font-medium text-black'>Mô tả</p>
              <textarea
                rows={3}
                className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
                defaultValue={data.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div> */}
            <div className='mt-4'>
              <p className='text-left font-medium text-black'>Trạng thái</p>
              <select
                className='border border-gray-500 w-full px-2 py-2 text-sm pr-8 rounded-md'
                // defaultValue={data.status}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, status: e.target.value }));
                }}
              >
                <option value='' disabled selected>
                  Chọn trạng thái
                </option>
                <option value='private'>Riêng tư</option>
                <option value='public'>Công khai</option>
              </select>
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
                  unit_id: data.unit_id,
                });
                handleClose();
              }}
              className='px-6 py-2 border border-gray-300 text-white bg-red-400 text-md rounded-md hover:bg-red-500 hover:shadow-md'
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUnitModal;
