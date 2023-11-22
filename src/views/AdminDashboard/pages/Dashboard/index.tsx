import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const InfoCart = () => {
  return (
    <div className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-4'>
      <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
        <div className='p-4 bg-green-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
            ></path>
          </svg>
        </div>
        <div className='px-4 text-gray-700'>
          <h3 className='text-sm tracking-wider'>Total Member</h3>
          <p className='text-3xl'>12,768</p>
        </div>
      </div>
      <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
        <div className='p-4 bg-blue-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
            ></path>
          </svg>
        </div>
        <div className='px-4 text-gray-700'>
          <h3 className='text-sm tracking-wider'>Total Post</h3>
          <p className='text-3xl'>39,265</p>
        </div>
      </div>
      <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
        <div className='p-4 bg-indigo-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
            ></path>
          </svg>
        </div>
        <div className='px-4 text-gray-700'>
          <h3 className='text-sm tracking-wider'>Total Comment</h3>
          <p className='text-3xl'>142,334</p>
        </div>
      </div>
      <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
        <div className='p-4 bg-red-400'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
            ></path>
          </svg>
        </div>
        <div className='px-4 text-gray-700'>
          <h3 className='text-sm tracking-wider'>Server Load</h3>
          <p className='text-3xl'>34.12%</p>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div>
      <div>Overview</div>
      <div className='mt-4'>
        <InfoCart />
      </div>
      <div className='flex gap-4 mt-4'>
        <div className='w-2/3 bg-white h-[320px] flex justify-center items-center border shadow-md rounded-md'>
          sdf
        </div>
        <div className='w-1/3 bg-white h-[320px] flex justify-center items-center border shadow-md rounded-md'>
          <Pie data={data} />
        </div>
      </div>
      <div className='flex gap-4 mt-4'>
        <div className='w-1/2 bg-red-300 h-[200px]'>đánh giá</div>
        <div className='w-1/2 bg-red-300'>bình luận</div>
      </div>
    </div>
  );
}

export default Dashboard;
