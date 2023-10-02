import React from "react";
import logo from "../../assets/logo_updrade.png";
import Input from "../Input/Input";
import Button from "../Button/button";
import { Link } from "react-router-dom";
import avatarEmpty from "../../assets/avatar.jpg";
import { BsBell, BsCart } from "react-icons/bs";

function Header() {
  const isAuth = true;

  const cartQuantity = 1;

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
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-6'>
                <div className='relative'>
                  <BsCart className='text-2xl' />
                  {cartQuantity > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {cartQuantity}
                    </div>
                  )}
                </div>
              </div>
              <div className='p-1 hover:cursor-pointer text-gray-500 hover:text-red-400 mr-8'>
                <div className='relative'>
                  <BsBell className='text-2xl' />
                  {cartQuantity > 0 && (
                    <div className='select-none absolute -top-[9px] text-[10px] -right-[8px] bg-red-400 text-white rounded-2xl px-[8px] pt-[4px] pb-[2px] leading-tight flex items-center justify-center font-bold'>
                      {cartQuantity}
                    </div>
                  )}
                </div>
              </div>
              <img
                src={avatarEmpty}
                alt='avatar'
                className='w-10 h-10 rounded-full'
              />
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
