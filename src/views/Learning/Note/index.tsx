import { secondsToTime } from "@/utils/convertNumber";
import React from "react";

function Note({ time }: { time: number }) {
  return (
    <div>
      <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
        <h3 className='font-semibold text-2xl leading-6 pl-2'>Ghi chú</h3>
        <div className='flex justify-center items-center mt-4'>
          <button className='py-2 px-4 border border-1 border-black mt-1 flex justify-between items-center w-full mx-32'>
            <p className='leading-loose text-md text-md'>
              Tạo ghi chú mới tại {secondsToTime(time)}
            </p>
            <p className='bg-gray-500 px-[8px] py-[1px] rounded-full text-white'>
              +
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;
