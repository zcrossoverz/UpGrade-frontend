/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumCourseStatus } from "@/apis/course.api";
import Badge from "@/components/Badge";
import ButtonTransition from "@/components/ButtonTransition";
import Loader from "@/components/Loader";
import {
  useGetCourse,
  useSubmitApprovalCourse,
  useUpdateCourse,
} from "@/hooks/useCourse";
import { formatCurrency, secondsToTimeString } from "@/utils/convertNumber";
import { formatTime } from "@/utils/time";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const countTotalTopics = (units: any[]) => {
  const totalTopics = units.reduce((accumulator, unit) => {
    return accumulator + unit.topics.length;
  }, 0);

  return totalTopics;
};

const calculateTotalDuration = (units: any[]) => {
  const totalDuration = units.reduce(
    (accumulator: any, unit: { topics: any }) => {
      const topics = unit.topics;
      const unitDuration = topics.reduce(
        (unitAccumulator: any, topic: { duration: any }) => {
          return unitAccumulator + topic.duration;
        },
        0
      );

      return accumulator + unitDuration;
    },
    0
  );
  return totalDuration;
};

function CourseDetailPage() {
  const { course_id } = useParams();
  const { data, isLoading } = useGetCourse(Number(course_id));

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

  const [formData, setFormData] = useState<{
    price?: any;
    description?: string;
    status?: enumCourseStatus;
  }>({});
  const submitApprovalHook = useSubmitApprovalCourse(Number(course_id));
  const navigate = useNavigate();
  const [enableEditor, setEnableEditor] = useState({
    description: false,
    price: false,
  });

  const updateCourseHook = useUpdateCourse(Number(course_id));

  return (
    <div>
      <h1 className='-mt-4'>Quản lý khóa học</h1>
      {isLoading ? (
        <div className='relative flex justify-center items-center min-h-[200px] mt-8'>
          <Loader />
        </div>
      ) : (
        <div className='bg-white overflow-hidden shadow rounded-lg border mt-4'>
          <div className='px-4 py-5 sm:px-6'>
            <div className='flex justify-between'>
              <div>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  {data?.title}
                </h3>
                <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                  {formatTime(data?.updated_at)}
                </p>
              </div>
              <div>
                <button
                  className='group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-500 px-8 py-3 text-white focus:outline-none'
                  onClick={() => {
                    navigate(`../course-management/edit/${course_id}`);
                  }}
                >
                  <span className='absolute -end-full transition-all group-hover:end-4'>
                    <svg
                      className='h-5 w-5 rtl:rotate-180'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>

                  <span className='text-sm font-medium transition-all group-hover:me-4'>
                    Đi tới khóa học
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
            <dl className='sm:divide-y sm:divide-gray-200'>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Mô tả</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3'>
                  {enableEditor.description ? (
                    <input
                      type='text'
                      defaultValue={data?.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className={`text-sm w-2/3 py-1 px-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white text-gray-800`}
                    />
                  ) : (
                    data?.description
                  )}
                </dd>
                <dd className='-mt-1'>
                  <div className='flex justify-end mr-4'>
                    <button
                      className='border border-gray-300 px-4 py-2 rounded-3xl text-gray-900 text-sm hover:bg-gray-200'
                      onClick={async () => {
                        if (!enableEditor.description) {
                          setEnableEditor((prev) => ({
                            ...prev,
                            description: true,
                          }));
                        } else {
                          await updateCourseHook.mutateAsync({
                            ...formData,
                            course_id: Number(course_id),
                          });
                          setTimeout(() => {
                            setEnableEditor((prev) => ({
                              ...prev,
                              description: false,
                            }));
                          }, 600);
                        }
                      }}
                    >
                      {enableEditor.description ? "Lưu lại" : "Chỉnh sửa"}
                    </button>
                  </div>
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>Giá</dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3'>
                  {enableEditor.price ? (
                    <input
                      type='text'
                      defaultValue={data?.price}
                      value={new Intl.NumberFormat("en-US").format(
                        formData.price || 0
                      )}
                      onChange={(e) => {
                        const numericValue = Number(
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                        setFormData((prev) => ({
                          ...prev,
                          price: numericValue,
                        }));
                      }}
                      className={`text-sm w-2/3 py-1 px-1 border border-t-0 border-r-0 border-l-0 outline-0 disabled:bg-white text-gray-800`}
                    />
                  ) : (
                    formatCurrency(data?.price)
                  )}
                </dd>
                <dd className='-mt-1'>
                  <div className='flex justify-end mr-4'>
                    <button
                      className='border border-gray-300 px-4 py-2 rounded-3xl text-gray-900 text-sm hover:bg-gray-200'
                      onClick={async () => {
                        if (!enableEditor.price) {
                          setEnableEditor((prev) => ({
                            ...prev,
                            price: true,
                          }));
                        } else {
                          await updateCourseHook.mutateAsync({
                            ...formData,
                            course_id: Number(course_id),
                          });
                          setTimeout(() => {
                            setEnableEditor((prev) => ({
                              ...prev,
                              price: false,
                            }));
                          }, 600);
                        }
                      }}
                    >
                      {enableEditor.price ? "Lưu lại" : "Chỉnh sửa"}
                    </button>
                  </div>
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500 flex items-center'>
                  Trạng thái
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center'>
                  {data?.status === "draft" && (
                    <Badge
                      text='Bản nháp'
                      color='text-gray-600'
                      bgColor='bg-gray-200'
                    />
                  )}
                  {data?.status === "published" && (
                    <Badge
                      text='Công khai'
                      color='text-green-600'
                      bgColor='bg-green-200'
                    />
                  )}
                  {data?.status === "private" && (
                    <Badge
                      text='Riêng tư'
                      color='text-red-600'
                      bgColor='bg-red-200'
                    />
                  )}
                  {data?.status === "block" && (
                    <Badge
                      text='Bị khóa'
                      color='text-red-600'
                      bgColor='bg-red-200'
                    />
                  )}
                  {data?.status === "rejected" && (
                    <Badge
                      text='Bị từ chối xét duyệt'
                      color='text-red-600'
                      bgColor='bg-red-200'
                    />
                  )}
                  {data?.status === "submitted" && (
                    <Badge
                      text='Đang chờ xét duyệt'
                      color='text-yellow-600'
                      bgColor='bg-yellow-100'
                    />
                  )}
                </dd>
                <dd className='-mt-1 col-span-2'>
                  <div className='flex justify-end mr-4'>
                    {data?.status === "draft" && (
                      <ButtonTransition
                        text='Gửi đơn xét duyệt'
                        handleClick={() => {
                          submitApprovalHook.mutateAsync({
                            course_id: Number(course_id),
                          });
                        }}
                        isLoading={submitApprovalHook.isLoading}
                        color='green'
                        svg={
                          <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            stroke='#b3ffc2'
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
                                d='M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z'
                                fill='#2bee41'
                              ></path>{" "}
                            </g>
                          </svg>
                        }
                      />
                    )}
                    {data?.status === "published" && (
                      <ButtonTransition
                        text='Đặt thành riêng tư'
                        handleClick={() => {
                          updateCourseHook.mutateAsync({
                            course_id,
                            status: "private",
                          });
                        }}
                        isLoading={submitApprovalHook.isLoading}
                        color='red'
                        svg={
                          <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 24 28'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='#ff2e2e'
                          >
                            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                            <g
                              id='SVGRepo_tracerCarrier'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            ></g>
                            <g id='SVGRepo_iconCarrier'>
                              {" "}
                              <g>
                                {" "}
                                <path fill='none' d='M0 0h24v24H0z'></path>{" "}
                                <path
                                  fill-rule='nonzero'
                                  d='M6 10v10h13V10H6zm12-2h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-9 3h2v2H7v-2zm0 3h2v2H7v-2zm0 3h2v2H7v-2z'
                                ></path>{" "}
                              </g>{" "}
                            </g>
                          </svg>
                        }
                      />
                    )}
                    {data?.status === "private" && (
                      <ButtonTransition
                        text='Đặt thành công khai'
                        handleClick={() => {
                          updateCourseHook.mutateAsync({
                            course_id,
                            status: "published",
                          });
                        }}
                        isLoading={submitApprovalHook.isLoading}
                        color='cyan'
                        svg={
                          <svg
                            width='20px'
                            height='20px'
                            viewBox='0 0 24 28'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            stroke='#06b6d4'
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
                                d='M13.5 16.5854C13.5 17.4138 12.8284 18.0854 12 18.0854C11.1716 18.0854 10.5 17.4138 10.5 16.5854C10.5 15.7569 11.1716 15.0854 12 15.0854C12.8284 15.0854 13.5 15.7569 13.5 16.5854Z'
                                fill='#06b6d4'
                              ></path>{" "}
                              <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M6.33367 10C6.20971 9.64407 6.09518 9.27081 5.99836 8.88671C5.69532 7.68444 5.54485 6.29432 5.89748 4.97439C6.26228 3.60888 7.14664 2.39739 8.74323 1.59523C10.3398 0.793061 11.8397 0.806642 13.153 1.32902C14.4225 1.83396 15.448 2.78443 16.2317 3.7452C16.4302 3.98851 16.6166 4.23669 16.7907 4.48449C17.0806 4.89706 16.9784 5.45918 16.5823 5.7713C16.112 6.14195 15.4266 6.01135 15.0768 5.52533C14.9514 5.35112 14.8197 5.17831 14.6819 5.0094C14.0088 4.18414 13.2423 3.51693 12.4138 3.18741C11.6292 2.87533 10.7252 2.83767 9.64112 3.38234C8.55703 3.92702 8.04765 4.6748 7.82971 5.49059C7.5996 6.35195 7.6774 7.36518 7.93771 8.39788C8.07953 8.96054 8.26936 9.50489 8.47135 10H18C19.6569 10 21 11.3431 21 13V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V13C3 11.3431 4.34315 10 6 10H6.33367ZM19 13C19 12.4477 18.5523 12 18 12H6C5.44772 12 5 12.4477 5 13V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V13Z'
                                fill='#06b6d4'
                              ></path>{" "}
                            </g>
                          </svg>
                        }
                      />
                    )}
                  </div>
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Số lượng học viên
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4'>
                  {data?.members_count}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Tổng số chương
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4'>
                  {data?.units?.length}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Tổng số bài học
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4'>
                  {totalTopics}
                </dd>
              </div>
              <div className='py-3 sm:py-5 sm:grid sm:grid-cols-5 sm:gap-4 sm:px-6'>
                <dt className='text-sm font-medium text-gray-500'>
                  Thời lượng khóa học
                </dt>
                <dd className='mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-4'>
                  {secondsToTimeString(totalDuration)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetailPage;
