import React from "react";
import { Link } from "react-router-dom";
import avatarEmpty from "../../../assets/avatar.jpg";
import { BsBell } from "react-icons/bs";
import { commentTime } from "@/utils/time";
import { BsFillCircleFill } from "react-icons/bs";
import { useAuth, useLogout } from "@/hooks/useAuth";

function Header() {
  const allNotifications = [
    {
      content:
        "Khóa học Typescript 2022 vừa có bài học mới, hãy vào học ngay thôi",
      link: "/orders",
      status: "unread",
      timestamp: 1696349854856,
    },
    {
      content:
        "Bạn đã thanh toán thành công khóa học Nestjs cơ bản và nâng cao",
      link: "/orders",
      status: "unread",
      timestamp: 1696341854856,
    },
    {
      content: "Bình luận của bạn vừa nhận được lượt tương tác, xem ngay nào",
      link: "/orders",
      status: "unread",
      timestamp: 1696349870983,
    },
    {
      content:
        "ABC đã trả lời bình luận của bạn trong khóa học Nestjs cơ bản và nâng cao",
      link: "/orders",
      status: "unread",
      timestamp: 1696349872983,
    },
    {
      content: "Chúc mừng! Khóa học CSS của bạn vừa có người đăng ký mới",
      link: "/orders",
      status: "unread",
      timestamp: 1696349871983,
    },
  ];

  const notifications = allNotifications.slice(0, 5);

  const auth = useAuth();

  const logout = useLogout();

  return (
    <div className='bg-white border sticky top-0 z-50 shadow-sm'>
      <div className='grid grid-cols-4 px-12'>
        <div className='flex justify-start items-center w-40 h-12 mt-3'></div>
        <div className='flex items-center px-4 col-span-2'></div>
        <div className='flex justify-end py-6 px-2 mt-2'>
          <div className='-mt-5 w-full flex justify-end items-center select-none pt-1'>
            <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-8 relative group transition duration-500 ease-out'>
              <div className='relative'>
                <BsBell className='text-2xl' />
                {allNotifications.length > 0 && (
                  <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                    {allNotifications.length}
                  </div>
                )}
              </div>
              <div className='absolute right-0 top-0 z-100 hidden bg-grey-200 group-hover:block'>
                <div className='absolute pt-12 right-0 -left-12'>
                  <div className='absolute border border-gray-300 bg-white w-96 z-100 right-0 shadow-2xl rounded-sm'>
                    {notifications.length === 0 ? (
                      <div className='text-black h-full p-4 text-center'>
                        Bạn không có thông báo nào
                      </div>
                    ) : (
                      <div className='text-black h-full'>
                        <div className='p-4 max-h-96 overflow-auto'>
                          {notifications.length > 0 &&
                            notifications.map((e, i) => (
                              <div
                                className='mt-1 grid grid-cols-8 hover:bg-gray-100 px-4 py-2'
                                key={i.toString()}
                              >
                                <div className='col-span-7'>
                                  <div className='line-clamp-3 text-sm leading-[15px] h-8 font-medium'>
                                    {e.content}
                                  </div>
                                  <div className='mt-1 text-[12px] leading-[14px]'>
                                    {commentTime(e.timestamp)}
                                  </div>
                                </div>
                                <div className='flex justify-end items-center col-span-1'>
                                  <BsFillCircleFill className='text-sm text-red-400' />
                                </div>
                              </div>
                            ))}
                        </div>
                        <hr className='mt-2' />
                        <div className='p-4'>
                          <div className='grid grid-cols-3'>
                            <div className='col-span-2 text-sm font-semibold flex items-center'>
                              <button className='text-indigo-600'>
                                Đánh dấu tất cả là đã đọc
                              </button>
                            </div>
                            <div className='ml-2'>
                              <button className='border text-md border-gray-500 hover:bg-gray-100 py-2 px-2 text-gray-600'>
                                Xem tất cả
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='relative group hover:cursor-pointer'>
              <img
                src={avatarEmpty}
                alt='avatar'
                className='w-10 h-10 rounded-full'
              />
              <div className='absolute right-0 top-0 z-100 hidden bg-grey-200 group-hover:block'>
                <div className='absolute pt-12 right-0 -left-12'>
                  <div className='absolute border border-gray-300 bg-white min-w-[250px] py-4 z-100 right-0 shadow-2xl rounded-sm px-4'>
                    <div>
                      <div className='grid grid-cols-6 mb-4'>
                        <div className='col-span-2 flex justify-center items-center'>
                          <img
                            src={avatarEmpty}
                            alt='avatar'
                            className='w-12 h-12 rounded-full'
                          />
                        </div>
                        <div className='col-span-4 flex flex-col'>
                          <p className='w-full line-clamp-2'>
                            {auth.data?.firstName || auth.data?.lastName
                              ? `${auth.data?.firstName} ${auth.data?.lastName}`
                              : `user#${auth.data?.id}`}
                          </p>
                          <p className='w-full text-sm text-gray-400'>
                            {auth.data?.username
                              ? `@${auth.data?.username}`
                              : auth.data?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className='mb-4' />
                    <div className='mb-4 text-md flex flex-col'>
                      <Link
                        className='cursor-pointer hover:bg-gray-100 px-2 py-1 w-full'
                        to={`/`}
                      >
                        Về trang chủ
                      </Link>
                    </div>
                    <hr className='mb-2' />
                    <div className='mb-4 text-md flex flex-col'>
                      <Link
                        className='cursor-pointer hover:bg-gray-100 px-2 py-1 w-full'
                        to={`/settings`}
                      >
                        Cài đặt
                      </Link>

                      <button
                        className='mt-1 cursor-pointer hover:bg-gray-100 px-2 py-1 w-full text-left text-md'
                        onClick={() => logout()}
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
