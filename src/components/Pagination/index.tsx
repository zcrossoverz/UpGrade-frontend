/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePagination } from "@/hooks/usePagination";
import React from "react";

function Pagination(props: {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  //   handlePageChange: any;
  siblingCount?: number;
}) {
  const { currentPage, totalCount, pageSize, siblingCount } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: siblingCount || 1,
    pageSize,
  });

  const lastPage = paginationRange[paginationRange.length - 1];

  console.log(lastPage);

  return (
    <div className='p-2 border-t mt-4'>
      <div className='flex items-center justify-between'>
        <div className='hidden flex-1 items-center lg:grid grid-cols-3'>
          <div className='flex items-center'>
            <div className='pl-2 text-sm font-medium dark:text-white'>
              Hiển thị từ <b>10</b> đến <b>20</b> trong <b>99</b> kết quả
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex items-center space-x-2 filament-tables-pagination-records-per-page-selector rtl:space-x-reverse'>
              <label>
                <select className='h-8 border text-sm pr-4 leading-none transition duration-75 border-gray-300 rounded-lg shadow-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-inset focus:ring-yellow-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:focus:border-yellow-500'>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='-1'>All</option>
                </select>
                <span className='text-sm font-medium ml-2'>mỗi trang</span>
              </label>
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <div className='py-3 border rounded-lg dark:border-gray-600'>
              <ol className='flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300 dark:text-gray-400 dark:divide-gray-600'>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600'
                    aria-label='Previous'
                    rel='prev'
                  >
                    <svg
                      className='w-5 h-5 rtl:scale-x-[-1]'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>1</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none transition text-cyan-600 filament-tables-pagination-item-active focus:underline bg-cyan-500/10 ring-2 ring-cyan-500'
                  >
                    <span>2</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>3</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>4</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>5</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>6</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none filament-tables-pagination-item-disabled cursor-not-allowed pointer-events-none opacity-70'
                  >
                    <span>...</span>
                  </button>
                </li>

                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>9</span>
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 focus:text-yellow-600 transition'
                  >
                    <span>10</span>
                  </button>
                </li>

                <li>
                  <button
                    type='button'
                    className='relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-yellow-500/10 focus:ring-2 focus:ring-yellow-500 dark:hover:bg-gray-400/5 transition text-yellow-600'
                    aria-label='Next'
                    rel='next'
                  >
                    <svg
                      className='w-5 h-5 rtl:scale-x-[-1]'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clip-rule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
