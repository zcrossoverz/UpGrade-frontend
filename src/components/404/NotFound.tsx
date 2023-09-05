import React from "react";
import img from "../../assets/404.png";

function NotFound() {
  return (
    <div className='bg-black h-screen w-screen flex justify-center content-center'>
      <img src={img} alt='404' className='p-20' />
    </div>
  );
}

export default NotFound;
