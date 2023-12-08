import React from "react";

function Progress({ percent }: { percent: number }) {
  return (
    <div className='flex w-full h-4 bg-gray-200 rounded-full overflow-hidden'>
      <div
        className='flex flex-col justify-center rounded-full overflow-hidden bg-indigo-400 text-xs text-white text-center whitespace-nowrap dark:bg-blue-500 transition duration-500'
        style={{
          width: `${percent}%`,
        }}
      >
        {percent}%
      </div>
    </div>
  );
}

export default Progress;
