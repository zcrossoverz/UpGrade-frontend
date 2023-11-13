import EmptyData from "@/components/EmptyData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/convertNumber";
import React from "react";
import { useNavigate } from "react-router-dom";

const CartItem = ({
  data,
  deleteItem,
}: {
  data: {
    title: string;
    lecturer: string;
    price: number;
    thumbnail_image: string;
    course_id: number;
  };
  deleteItem: (course_id: number) => void;
}) => {
  const { title, lecturer, price, thumbnail_image, course_id } = data;
  const navigate = useNavigate();
  return (
    <div className='grid grid-cols-6 my-4'>
      <div className='h-20 w-[156px]'>
        <img
          src={thumbnail_image}
          className='h-full w-full'
          alt='course thumbnail'
        />
      </div>
      <div className='col-span-4 grid grid-cols-3'>
        <div className='col-span-2'>
          <p className='text-[16px] font-semibold line-clamp-3 leading-[15px]'>
            {title}
          </p>
          <p className='text-gray-600 text-sm mt-1'>{lecturer}</p>
        </div>
        <div className='ml-2 flex flex-col pr-6 text-violet-800'>
          <div className='w-full flex justify-end'>
            <button onClick={() => deleteItem(course_id)}>Xoá</button>
          </div>
          <div className='w-full flex justify-end'>
            <button onClick={() => navigate(`/course-details/${course_id}`)}>
              Đi tới khóa học
            </button>
          </div>
        </div>
      </div>
      <div className='text-gray-800 font-bold leading-loose text-xl -mt-1'>
        {formatCurrency(price)}
      </div>
    </div>
  );
};

function Cart() {
  const { cart, deleteItem, totalPrice } = useCart();

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-16 pt-28 min-h-[568px]'>
        {cart?.length === 0 ? (
          <p className='flex items-center justify-center h-20'>
            <EmptyData />
          </p>
        ) : (
          <div className='grid grid-cols-5 gap-4'>
            <div className='col-span-4 ml-16'>
              <div className='col-span-2'>
                <h1 className='font-bold text-4xl leading-loose'>Giỏ hàng</h1>
                <p className='mt-6 font-semibold text-[15px] mb-[3px]'>
                  {cart?.length} khóa học trong giỏ hàng
                </p>
                <hr className='mr-20' />
                <div className='mt-4'>
                  {cart &&
                    cart?.length > 0 &&
                    cart?.map((e, i) => (
                      <div>
                        <CartItem data={e} key={i} deleteItem={deleteItem} />
                        {i !== cart?.length - 1 && <hr className='mr-20' />}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className='mt-24'>
              <div className='text-lg text-gray-500 font-bold'>Tổng:</div>
              <div className='mt-2 text-[26px] font-bold'>
                {formatCurrency(totalPrice())}
              </div>
              <div className='mt-2 py-2'>
                <button className='px-4 py-2 bg-violet-500 text-white w-full'>
                  Thanh toán
                </button>
              </div>
              <hr className='mt-2' />
              {/* <div className='mt-4'>Khuyến mãi</div>
            <div className='flex mt-4'>
              <input
                type='text'
                placeholder='Nhập coupon'
                className='py-[6px] px-4 max-w-[188px] border border-r-0 border-gray-800 focus:outline-none'
              />
              <button className='min-w-fit bg-red-400 text-white w-full border-hidden'>
                Áp dụng
              </button>
            </div> */}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
