import { LineChart } from "./chart/Line";
import { PieChart } from "./chart/Pie";

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
          <LineChart />
        </div>
        <div className='w-1/3 bg-white h-[320px] p-6 flex justify-center items-center border shadow-md rounded-md'>
          <PieChart />
        </div>
      </div>
      <div className='flex gap-4 mt-4'>
        <div className='w-2/5 min-h-[200px] border rounded-md shadow-md p-4 bg-white'>
          <div>
            <div className='font-bold mb-2'>
              Top khóa học có số lượng đăng ký nhiều nhất
            </div>
            <div>
              <div className='flex gap-2'>
                <p>1.</p>
                <p>Nhập môn js</p>
                <p className='ml-auto text-sm text-gray-500'>100329 Học viên</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-3/5 border rounded-md shadow-md p-4 bg-white'>
          <div>
            <div className='font-bold mb-2'>
              Top khóa học có đánh giá cao nhất
            </div>
            <div>
              <div className='flex gap-2'>
                <p>1.</p>
                <p>Nhập môn js</p>
                <p className='ml-auto text-sm text-gray-500'>
                  xếp hạng 4.5 sao trên tổng số 50 đánh giá
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
