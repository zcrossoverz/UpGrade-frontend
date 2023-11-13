/* eslint-disable @typescript-eslint/no-explicit-any */
import { secondsToTimeString } from "@/utils/convertNumber";
import { formatTime } from "@/utils/time";
import {
  calculateTotalDuration,
  countTotalTopics,
} from "@/views/AdminDashboard/pages/CourseManagement/courses/CourseDetailPage";
import React, { useMemo } from "react";

function InfoContent({ data }: { data: any }) {
  const totalDuration = useMemo(() => {
    if (data && data.units) {
      return calculateTotalDuration(data.units);
    }
    return 0;
  }, [data]);

  const totalTopics = useMemo(() => {
    if (data && data.units) {
      return countTotalTopics(data.units);
    }
    return 0;
  }, [data]);

  return (
    <div className='px-8'>
      <div className='bg-white overflow-hidden mt-4'>
        <div className='px-4 py-5 sm:px-6'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-2xl leading-6 font-bold text-gray-900'>
                Giới thiệu về khóa học
              </h3>
              <p className='mt-6 text-gray-700'>{data?.description}</p>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-200 px-4 py-5 sm:p-0 text-gray-500'>
          <dl className='sm:divide-y sm:divide-gray-200'>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Cập nhật lúc
              </dt>

              <dd className='mt-1 text-sm sm:mt-0 sm:col-span-2'>
                {formatTime(data?.updated_at)}
              </dd>
            </div>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Ngày khởi tạo
              </dt>

              <dd className='mt-1 text-sm sm:mt-0 sm:col-span-2'>
                {formatTime(data?.created_at)}
              </dd>
            </div>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Tổng số chương
              </dt>
              <dd className='mt-1 text-sm sm:mt-0 sm:col-span-2'>
                {data?.units?.length}
              </dd>
            </div>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Tổng số bài học
              </dt>
              <dd className='mt-1 text-sm sm:mt-0 sm:col-span-2'>
                {totalTopics}
              </dd>
            </div>
            <div className='py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Tổng thời lượng khóa học
              </dt>
              <dd className='mt-1 text-sm sm:mt-0 sm:col-span-2'>
                {secondsToTimeString(totalDuration)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default InfoContent;
