import React, { useState } from "react";
import logo from "../../assets/logo_updrade.png";
import Input from "../Input/Input";
import Button from "../Button/button";
import { Link, useNavigate } from "react-router-dom";
import avatarEmpty from "../../assets/avatar.jpg";
import { BsBell, BsCart } from "react-icons/bs";
import { formatCurrency } from "@/utils/convertNumber";
import { commentTime } from "@/utils/time";
import { BsFillCircleFill } from "react-icons/bs";
import Auth from "../Auth";
import { useAuth, useLogout } from "@/hooks/useAuth";

function Header() {
  const allCartProducts = [
    {
      title: "NestJS Zero to Hero - Modern TypeScript Back-end Development",
      lecturer: "Ariel Weinberger",
      price: 2499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/2053219_e620_2.jpg",
    },
    {
      title: "Flutter & Dart - The Complete Guide [2023 Edition]",
      lecturer: "Maximilian Schwarzmuller",
      price: 1499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1708340_7108_5.jpg",
    },
    {
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 86437,
      price: 2899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
    },
    {
      title: "The Complete 2023 Web Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 317895,
      price: 2199000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    },
    {
      title: "The Ultimate Guide to Game Development with Unity (Official)",
      lecturer: "Dr. Jonathan",
      rate: 4.2,
      rate_number: 7895,
      price: 899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg",
    },
    {
      title: "TensorFlow Developer Certificate in 2023: Zero to Mastery",
      lecturer: "Dr. Davis",
      rate: 4.4,
      rate_number: 9895,
      price: 1899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/3693164_f87d_3.jpg",
    },
  ];

  const cartProducts = allCartProducts.slice(0, 3);

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

  const [openPopupAuth, setOpenPopupAuth] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const logout = useLogout();

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
                  {allCartProducts.length > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {allCartProducts.length}
                    </div>
                  )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute border border-gray-300 bg-white w-96 z-100 right-0 shadow-2xl rounded-sm'>
                      {allCartProducts.length === 0 ? (
                        <div className='text-black h-full p-4 text-center'>
                          Giỏ hàng trống
                        </div>
                      ) : (
                        <div className='text-black h-full'>
                          <div className='p-4'>
                            {cartProducts.length > 0 &&
                              cartProducts.map((e, i) => (
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
                            {allCartProducts.length > 3 && (
                              <div className='mt-2'>
                                và {allCartProducts.length - 3} khóa học khác...
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
                  {allNotifications.length > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {allNotifications.length}
                    </div>
                  )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
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
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
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
                          to={`/course-management`}
                        >
                          Khóa học của tôi
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
                extraClass='bg-green text-white -mt-5'
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
