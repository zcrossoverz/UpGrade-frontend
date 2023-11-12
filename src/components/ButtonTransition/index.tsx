/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

function ButtonTransition({
  text,
  svg,
  color,
  handleClick,
  isLoading,
}: {
  text: string;
  svg: any;
  color: string;
  handleClick: any;
  isLoading: boolean;
}) {
  return (
    <button
      onClick={handleClick}
      className={`group relative inline-block text-sm font-medium text-${color}-600 focus:outline-none active:text-${color}-500`}
    >
      <span className='absolute inset-0 border border-current'></span>
      <span className='flex items-center block border border-current bg-white px-8 py-2 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1'>
        <p className='mr-2'>{isLoading ? "Đang xử lý..." : text}</p>
        <div>{svg}</div>
      </span>
    </button>
  );
}

export default ButtonTransition;
