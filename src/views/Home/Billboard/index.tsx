import React from "react";

function Billboard() {
  return (
    <div
      className='static h-100 z-0 select-none'
      style={{
        zIndex: 1,
        backgroundImage:
          "url(https://img-c.udemycdn.com/notices/web_carousel_slide/image/0661bb90-3d05-4709-95a2-c61f927cf78c.jpg)",
        justifyContent: "center",
      }}
    >
      <div className='absolute bg-white m-40 w-100 px-4 py-8 left-16 top-5 shadow-lg h-30 rounded-md shadow-full'>
        <h2 className='text-2xl font-bold leading-relaxed'>
          Tham gia học tập với nhiều khóa học chất lượng
        </h2>
        <p className='leading-normal'>
          Lựa chọn trong số hơn 210000 khóa học video online với nhiều nội dung
          bổ sung mới được xuất bản hàng tháng
        </p>
      </div>
    </div>
  );
}

export default Billboard;
