/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import logo from "../../assets/logo_updrade.png";
import Input from "../Input/Input";
import Button from "../Button/button";
import { Link, useNavigate } from "react-router-dom";
import { BsBell, BsCart } from "react-icons/bs";
import { formatCurrency } from "@/utils/convertNumber";
import { commentTime, convertTimestamp } from "@/utils/time";
import { BsFillCircleFill } from "react-icons/bs";
import Auth from "../Auth";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import {
  useGetNotification,
  useMarkNotificationAsRead,
} from "@/hooks/useNotification";
import Avatar from "../Avatar";

function Header() {
  const [openPopupAuth, setOpenPopupAuth] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const logout = useLogout();

  const { cart } = useCart();
  const notifications = useGetNotification();
  const markReadHook = useMarkNotificationAsRead();

  return (
    <div className='bg-white border'>
      <div className='grid grid-cols-4 px-12'>
        <div className='flex justify-start items-center w-40 h-12 mt-3'>
          <Link to={"/"}>
            <img src={logo} alt='logo upgrade' className='p-2 pl-4' />
          </Link>
        </div>
        <div className='flex items-center px-4 col-span-2'>
          <Input
            extraClass='rounded-xl w-[450px] py-[4px] hover:border-[0.5px]'
            properties={{
              placeholder: "search",
            }}
          />
        </div>
        <div className='flex justify-end py-6 px-2 mt-2'>
          {auth.isAuthenticated ? (
            <div className='-mt-5 w-full flex justify-end items-center select-none pt-1'>
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-6 relative group transition duration-500 ease-out'>
                <div className='relative'>
                  <BsCart className='text-2xl' />
                  {cart && cart?.length > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {cart?.length}
                    </div>
                  )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute border border-gray-300 bg-white w-96 z-100 right-0 shadow-2xl rounded-sm'>
                      {cart?.length === 0 ? (
                        <div className='text-black h-full p-4 text-center'>
                          Giỏ hàng trống
                        </div>
                      ) : (
                        <div className='text-black h-full'>
                          <div className='p-4'>
                            {cart &&
                              cart?.length > 0 &&
                              cart?.map((e, i) => (
                                <div
                                  className='mt-4 grid grid-cols-5'
                                  key={i.toString()}
                                >
                                  <div className='h-16 w-18'>
                                    <img
                                      src={e.thumbnail_image}
                                      className='h-full w-full'
                                      alt='course thumbnail'
                                    />
                                  </div>
                                  <div className='col-span-4 ml-2'>
                                    <div className='line-clamp-2 text-sm leading-[15px] h-8 font-semibold'>
                                      {e.title}
                                    </div>
                                    <div className='mt-1 text-[12px] leading-[14px]'>
                                      {e.lecturer}
                                    </div>
                                    <div className='text-gray-700 font-semibold'>
                                      {formatCurrency(e.price)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {cart && cart?.length > 3 && (
                              <div className='mt-2'>
                                và {cart?.length - 3} khóa học khác...
                              </div>
                            )}
                          </div>
                          <hr />
                          <div className='p-4'>
                            <div className='flex font-bold text-lg'>
                              <p className='leading-loose text-gray-700 mr-2'>
                                Tổng:
                              </p>
                              <p className='text-xl leading-relaxed '>
                                {formatCurrency(90000000)}
                              </p>
                            </div>
                            <div className='mt-2'>
                              <button
                                className='py-3 px-4 flex w-full bg-gray-700 text-white justify-center rounded-sm shadow-xl'
                                onClick={() => navigate("/cart")}
                              >
                                Chuyển đến giỏ hàng
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-8 relative group transition duration-500 ease-out'>
                <div className='relative'>
                  <BsBell className='text-2xl' />
                  {!notifications?.isLoading &&
                    notifications?.data?.datas?.length > 0 && (
                      <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                        {notifications?.data?.datas?.length}
                      </div>
                    )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute border border-gray-300 bg-white w-96 z-100 right-0 shadow-2xl rounded-sm'>
                      {!notifications?.isLoading &&
                      notifications?.data?.datas?.length === 0 ? (
                        <div className='text-black h-full p-4 text-center'>
                          Bạn không có thông báo nào
                        </div>
                      ) : (
                        <div className='text-black h-full'>
                          <div className='p-4 max-h-96 overflow-auto flex flex-col'>
                            {!notifications?.isLoading &&
                              notifications?.data?.datas?.length &&
                              notifications?.data?.datas.map(
                                (e: any, i: any) => (
                                  <button
                                    className='mt-1 grid grid-cols-8 hover:bg-gray-100 px-4 py-2'
                                    key={i.toString()}
                                    onClick={() =>
                                      markReadHook.mutateAsync({ id: e.id })
                                    }
                                  >
                                    <div className='col-span-7'>
                                      <div className='line-clamp-3 text-sm leading-[15px] h-8 font-medium text-left'>
                                        {e.text}
                                      </div>
                                      <div className='mt-1 text-[12px] leading-[14px] text-left'>
                                        {commentTime(
                                          convertTimestamp(e.created_at)
                                        )}
                                      </div>
                                    </div>
                                    <div className='flex justify-end items-center col-span-1'>
                                      <BsFillCircleFill className='text-sm text-red-400' />
                                    </div>
                                  </button>
                                )
                              )}
                          </div>
                          <hr className='mt-2' />
                          <div className='p-4'>
                            <div className='grid grid-cols-3'>
                              <div className='col-span-2 text-sm font-semibold flex items-center'>
                                <button
                                  className='text-indigo-600'
                                  onClick={() => markReadHook.mutateAsync({})}
                                >
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
                <Avatar size={10} />
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute border border-gray-300 bg-white min-w-[250px] py-4 z-100 right-0 shadow-2xl rounded-sm px-4'>
                      <div>
                        <div className='grid grid-cols-6 mb-4'>
                          <div className='col-span-2 flex justify-center items-center'>
                            <Avatar size={12} />
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
                          to={
                            auth.isAdmin
                              ? "/admin/overview"
                              : "`/admin/course-management`"
                          }
                        >
                          {auth.isAdmin
                            ? "Bảng điều khiển"
                            : "Khóa học của tôi"}
                        </Link>
                        <Link
                          className='mt-1 cursor-pointer hover:bg-gray-100 px-2 py-1 w-full'
                          to={`/my-library`}
                        >
                          Thư viện của tôi
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
          ) : (
            <div>
              <Auth
                isPopupOpen={openPopupAuth}
                handleClose={() => setOpenPopupAuth(false)}
              />
              <Button
                text='Đăng nhập'
                extraClass='bg-red-400 text-white -mt-5'
                properties={{
                  onClick: () => setOpenPopupAuth(true),
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
