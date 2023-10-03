import React from "react";
import logo from "../../assets/logo_updrade.png";
import Input from "../Input/Input";
import Button from "../Button/button";
import { Link } from "react-router-dom";
import avatarEmpty from "../../assets/avatar.jpg";
import { BsBell, BsCart } from "react-icons/bs";
import { formatCurrency } from "@/utils/convertNumber";

function Header() {
  const isAuth = true;

  const cartQuantity = 1;

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

  return (
    <div className='bg-white border'>
      <div className='grid grid-cols-3 px-12 pt-2'>
        <div className='flex justify-start w-48 h-20'>
          <Link to={"/"}>
            <img src={logo} alt='logo upgrade' className='p-2 pl-4' />
          </Link>
        </div>
        <div className='px-4 mt-4'>
          <Input
            extraClass='rounded-xl w-full'
            properties={{
              placeholder: "search",
            }}
          />
        </div>
        <div className='flex justify-end py-8 px-2'>
          {isAuth ? (
            <div className='-mt-5 w-full flex justify-end items-center select-none'>
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-6 relative group transition duration-500 ease-out'>
                <div className='relative'>
                  <BsCart className='text-2xl' />
                  {cartQuantity > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {cartQuantity}
                    </div>
                  )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute border border-gray-300 bg-white w-96 z-100 right-0 shadow-2xl rounded-sm'>
                      <div className='text-black h-full'>
                        <div className='p-4'>
                          {cartProducts.map((e, i) => (
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
                            <button className='py-3 px-4 flex w-full bg-gray-700 text-white justify-center rounded-sm shadow-xl'>
                              Chuyển đến giỏ hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-8 relative group transition duration-500 ease-out'>
                <div className='relative'>
                  <BsBell className='text-2xl' />
                  {cartQuantity > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {cartQuantity}
                    </div>
                  )}
                </div>
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute bg-yellow-300 h-40 w-80 z-100 right-0'></div>
                  </div>
                </div>
              </div>
              <div className='relative group'>
                <img
                  src={avatarEmpty}
                  alt='avatar'
                  className='w-10 h-10 rounded-full'
                />
                <div className='absolute right-0 top-0 z-10 hidden bg-grey-200 group-hover:block'>
                  <div className='absolute pt-12 right-0 -left-12'>
                    <div className='absolute bg-yellow-300 h-40 w-80 z-100 right-0'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button text='Đăng nhập' extraClass='bg-green text-white -mt-5' />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
