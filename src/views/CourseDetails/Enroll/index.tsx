import { formatCurrency } from "@/utils/convertNumber";
import React from "react";

function Enroll({ price, id }: { price: number; id: number }) {
  return (
    <div>
      {price > 0 ? (
        <div>
          <div>{formatCurrency(price)}</div>
          <button>Thêm vào giỏ hàng</button>
        </div>
      ) : (
        <div>
          <div className='text-3xl leading-loose text-center text-red-500'>
            Miễn phí
          </div>
          <button className='bg-red-500 px-8 py-3 rounded-3xl text-white'>
            ĐĂNG KÝ HỌC
          </button>
        </div>
      )}
    </div>
  );
}

export default Enroll;
