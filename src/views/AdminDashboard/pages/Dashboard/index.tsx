/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetOverview } from "@/hooks/useAnalystic";
import { LineChart } from "./chart/Line";
import { PieChart } from "./chart/Pie";
import Tooltip from "@/components/Tooltip";
import { Link } from "react-router-dom";
import { useGetListUser } from "@/hooks/useUser";

const InfoCart = () => {
  const getOverview = useGetOverview();

  const userHook = useGetListUser({
    page: 1,
    limit: 1,
  });

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
          <h3 className='text-sm tracking-wider'>Tổng thành viên</h3>
          <p className='text-3xl'>{userHook.data?.count}</p>
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
          <h3 className='text-sm tracking-wider'>Tổng số khóa học</h3>
          <p className='text-3xl'>{getOverview.data?.totalCourse}</p>
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
          <h3 className='text-sm tracking-wider'>Tổng số bình luận</h3>
          <p className='text-3xl'>{getOverview.data?.totalComment}</p>
        </div>
      </div>
      <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
        <div className='p-4 bg-red-400'>
          <svg
            className='h-10 m-1 w-12 text-white'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
            <g
              id='SVGRepo_tracerCarrier'
              stroke-linecap='round'
              stroke-linejoin='round'
            ></g>
            <g id='SVGRepo_iconCarrier'>
              {" "}
              <path
                d='M16 1C17.6569 1 19 2.34315 19 4C19 4.55228 18.5523 5 18 5C17.4477 5 17 4.55228 17 4C17 3.44772 16.5523 3 16 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H16C16.5523 21 17 20.5523 17 20V19C17 18.4477 17.4477 18 18 18C18.5523 18 19 18.4477 19 19V20C19 21.6569 17.6569 23 16 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H16Z'
                fill='#ffffff'
              ></path>{" "}
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M20.7991 8.20087C20.4993 7.90104 20.0132 7.90104 19.7133 8.20087L11.9166 15.9977C11.7692 16.145 11.6715 16.3348 11.6373 16.5404L11.4728 17.5272L12.4596 17.3627C12.6652 17.3285 12.855 17.2308 13.0023 17.0835L20.7991 9.28666C21.099 8.98682 21.099 8.5007 20.7991 8.20087ZM18.2991 6.78666C19.38 5.70578 21.1325 5.70577 22.2134 6.78665C23.2942 7.86754 23.2942 9.61999 22.2134 10.7009L14.4166 18.4977C13.9744 18.9398 13.4052 19.2327 12.7884 19.3355L11.8016 19.5C10.448 19.7256 9.2744 18.5521 9.50001 17.1984L9.66448 16.2116C9.76728 15.5948 10.0602 15.0256 10.5023 14.5834L18.2991 6.78666Z'
                fill='#ffffff'
              ></path>{" "}
              <path
                d='M5 7C5 6.44772 5.44772 6 6 6H14C14.5523 6 15 6.44772 15 7C15 7.55228 14.5523 8 14 8H6C5.44772 8 5 7.55228 5 7Z'
                fill='#ffffff'
              ></path>{" "}
              <path
                d='M5 11C5 10.4477 5.44772 10 6 10H10C10.5523 10 11 10.4477 11 11C11 11.5523 10.5523 12 10 12H6C5.44772 12 5 11.5523 5 11Z'
                fill='#ffffff'
              ></path>{" "}
              <path
                d='M5 15C5 14.4477 5.44772 14 6 14H7C7.55228 14 8 14.4477 8 15C8 15.5523 7.55228 16 7 16H6C5.44772 16 5 15.5523 5 15Z'
                fill='#ffffff'
              ></path>{" "}
            </g>
          </svg>
        </div>
        <div className='px-4 text-gray-700'>
          <h3 className='text-sm tracking-wider'>Tổng số lượt đánh giá</h3>
          <p className='text-3xl'>{getOverview.data?.totalReview}</p>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const getOverview = useGetOverview();

  return (
    <div>
      <div className='font-semibold leading-loose text-lg -mt-8'>Tổng quan</div>
      <div className='-mt-2'>
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
            <div className='font-bold mb-4'>
              Top khóa học có số lượng đăng ký nhiều nhất
            </div>
            <div className='mt-2'>
              {getOverview.data?.topEnrollment?.length > 0
                ? getOverview.data?.topEnrollment?.map((e: any, i: any) => (
                    <div className='flex gap-1 mt-1'>
                      <p>{i + 1}.</p>
                      <Tooltip content={e.title}>
                        <Link to={`/admin/course-management/details/${e.id}`}>
                          <p className='line-clamp-1 overflow-hidden hover:text-indigo-500'>
                            {e.title}
                          </p>
                        </Link>
                      </Tooltip>
                      <p
                        className='ml-auto text-sm text-gray-500'
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {e.members_count} học viên
                      </p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
        <div className='w-3/5 border rounded-md shadow-md p-4 bg-white'>
          <div>
            <div className='font-bold mb-2'>
              Top khóa học có đánh giá cao nhất
            </div>
            <div>
              {getOverview.data?.topRate?.length > 0
                ? getOverview.data?.topRate?.map((e: any, i: any) => (
                    <div className='flex gap-1 mt-1 hover:text-indigo-500'>
                      <p>{i + 1}.</p>
                      <Tooltip content={e.title}>
                        <Link to={`/admin/course-management/details/${e.id}`}>
                          <p className='line-clamp-1 overflow-hidden'>
                            {e.title}
                          </p>
                        </Link>
                      </Tooltip>
                      <p
                        className='ml-auto text-sm text-gray-500'
                        style={{ whiteSpace: "nowrap" }}
                      >
                        xếp hạng {e.rate ? Number(e.rate).toFixed(1) : 0} sao
                        trên tổng số {e.rate_number} đánh giá
                      </p>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
