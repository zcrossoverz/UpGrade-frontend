import React, { useState } from "react";
import { MdCancel } from "react-icons/md";

const Step1 = () => {
  return (
    <div className='w-full'>
      <h3 className='text-left font-medium'>Chọn lĩnh vực</h3>
      <div className='my-2'>
        <select className='border border-gray-500 w-full px-2 py-3 text-sm pr-8 rounded-md'>
          <option value='' className='py-4'>
            Công nghệ thông tin
          </option>
          <option value=''>Marketing</option>
          <option value=''>Kinh doanh</option>
        </select>
      </div>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className='w-full'>
      <div className='my-2'>
        <div className='flex flex-col'>
          <div>
            <p className='text-left font-medium'>Tên khóa học</p>
            <input
              type='text'
              className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
            />
          </div>
          <div className='mt-4'>
            <p className='text-left font-medium'>Mô tả</p>
            <textarea
              rows={3}
              className='py-2 px-4 border border-gray-400 mt-2 outline-none rounded-md w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className='w-full'>
      <div className='my-2'>
        <div className='flex flex-col'>
          <div>
            <p className='text-left font-medium'>Upload ảnh bìa khóa học</p>
            <input
              type='file'
              className=' border border-gray-400 mt-2 outline-none w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function CreateCourseModal({
  isPopupOpen,
  handleClose,
}: {
  isPopupOpen: boolean;
  handleClose: () => void;
}) {
  const [step, setStep] = useState<number>(0);

  const steps = [<Step1 />, <Step2 />, <Step3 />];

  const handleSubmit = () => {};

  const handlePrevClick = () => {
    setStep((prevStep) => {
      if (prevStep > 0) {
        return prevStep - 1;
      }
      return prevStep;
    });
  };

  const handleNextClick = () => {
    setStep((prevStep) => {
      if (prevStep < steps.length - 1) {
        return prevStep + 1;
      }
      return prevStep;
    });
  };

  return (
    <>
      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 select-none transition duration-500 ease-in-out'>
          <div className='absolute inset-0 bg-black opacity-50'></div>
          <div className='relative z-10 bg-white px-24 py-6 rounded-lg shadow-lg min-w-[600px]'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='absolute top-3 left-4'>
                <p className='font-semibold text-xl leading-loose'>
                  Tạo khóa học
                </p>
              </div>
              <button
                onClick={() => {
                  setStep(0);
                  handleClose();
                }}
              >
                <MdCancel className='absolute text-[32px] text-gray-500 hover:text-red-500 top-3 right-3' />
              </button>
            </div>

            <div className='flex justify-center mb-10 mt-8'>{steps[step]}</div>
            <div className='min-w-[220px] text-[12px] text-center text-gray-500'>
              <div className='flex justify-end w-full'>
                <button
                  onClick={step === 0 ? handleClose : handlePrevClick}
                  className='mr-4 px-4 py-2 border border-gray-400 text-black text-md rounded-md hover:bg-gray-300 hover:shadow-md'
                >
                  {step === 0 ? "Hủy bỏ" : "Quay lại"}
                </button>
                <button
                  onClick={
                    step === steps.length - 1 ? handleSubmit : handleNextClick
                  }
                  className='px-6 py-2 border border-gray-300 text-white bg-red-400 text-md rounded-md hover:bg-red-500 hover:shadow-md'
                >
                  {step === steps.length - 1 ? "Khởi tạo khóa học" : "Tiếp tục"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateCourseModal;
