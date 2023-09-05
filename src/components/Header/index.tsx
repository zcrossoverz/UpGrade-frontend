import React from "react";
import logo from "../../assets/logo_updrade.png";
import Input from "../Input/Input";
import Button from "../Button/button";
import { Link } from "react-router-dom";

function Header() {
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
          <Button text='Đăng nhập' extraClass='bg-green text-white -mt-5' />
        </div>
      </div>
    </div>
  );
}

export default Header;
