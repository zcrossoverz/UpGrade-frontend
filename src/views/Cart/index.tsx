import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { formatCurrency } from "@/utils/convertNumber";
import React from "react";

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

    price: 2899000,
    thumbnail_image:
      "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
  },
  {
    title: "The Complete 2023 Web Development Bootcamp",
    lecturer: "Dr. Angela Yu",

    price: 2199000,
    thumbnail_image:
      "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
  },
  {
    title: "The Ultimate Guide to Game Development with Unity (Official)",
    lecturer: "Dr. Jonathan",

    price: 899000,
    thumbnail_image:
      "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg",
  },
  {
    title: "TensorFlow Developer Certificate in 2023: Zero to Mastery",
    lecturer: "Dr. Davis",
    price: 1899000,
    thumbnail_image:
      "https://img-c.udemycdn.com/course/240x135/3693164_f87d_3.jpg",
  },
];

const CartItem = ({
  data,
}: {
  data: {
    title: string;
    lecturer: string;
    price: number;
    thumbnail_image: string;
  };
}) => {
  const { title, lecturer, price, thumbnail_image } = data;
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
        <div className='ml-2 flex flex-col pr-6 text-red-400'>
          <div className='w-full flex justify-end'>
            <button>Xoá</button>
          </div>
          <div className='w-full flex justify-end'>
            <button>Thêm vào danh sách ước</button>
          </div>
        </div>
      </div>
      <div className='text-red-400'>{formatCurrency(price)}</div>
    </div>
  );
};

function Cart() {
  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-16 pt-28'>
        <div className='grid grid-cols-5 gap-4'>
          <div className='col-span-4 ml-16'>
            <div className='col-span-2'>
              <h1 className='font-bold text-4xl leading-loose'>Giỏ hàng</h1>
              <p className='mt-6 font-semibold text-[15px] mb-[3px]'>
                {allCartProducts.length} khóa học trong giỏ hàng
              </p>
              <hr className='mr-20' />
              <div className='mt-4'>
                {allCartProducts.length > 0 &&
                  allCartProducts.map((e, i) => (
                    <div>
                      <CartItem data={e} key={i} />
                      {i !== allCartProducts.length - 1 && (
                        <hr className='mr-20' />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='mt-24'>
            <div className='text-lg text-gray-500 font-bold'>Tổng:</div>
            <div className='mt-2 text-[26px] font-bold'>
              {formatCurrency(99999999)}
            </div>
            <div className='mt-2 py-2'>
              <button className='px-4 py-2 bg-red-400 text-white w-full'>
                Thanh toán
              </button>
            </div>
            <hr className='mt-2' />
            <div className='mt-4'>Khuyến mãi</div>
            <div className='flex mt-4'>
              <input
                type='text'
                placeholder='Nhập coupon'
                className='py-[6px] px-4 max-w-[188px] border border-r-0 border-gray-800 focus:outline-none'
              />
              <button className='min-w-fit bg-red-400 text-white w-full border-hidden'>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
