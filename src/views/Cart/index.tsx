import EmptyData from "@/components/EmptyData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/convertNumber";
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useEnrollMultiCourses } from "@/hooks/useCourse";

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
          src={`http://localhost:3000/proxy/?image=${thumbnail_image}`}
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
  const authHook = useAuth();
  const [checkoutFlag, setCheckoutFlag] = useState(false);
  const enrollHook = useEnrollMultiCourses();

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
              {!checkoutFlag && (
                <div className='mt-2 py-2'>
                  <button
                    className='px-4 py-2 bg-violet-500 text-white w-full'
                    onClick={() => {
                      if (authHook.isAuthenticated) {
                        setCheckoutFlag(true);
                      } else {
                        toast.error("Vui lòng đăng nhập để thanh toán");
                      }
                    }}
                  >
                    Thanh toán
                  </button>
                </div>
              )}
              <hr className='mt-2' />
              {checkoutFlag && (
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "ARhc83F9ivtDxMMCiPqi0xHJUEna0-60ItEcG5yCF4AJRGjNYTIXg12HJbwwDUWIebfRVG4WwpU7VIyc",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            description: `Đơn hàng của ${authHook.data?.firstName} ${authHook.data?.lastName}`,
                            amount: {
                              value: `${(totalPrice() * 0.000043).toFixed(2)}`,
                              breakdown: {
                                item_total: {
                                  currency_code: "USD",
                                  value: `${(totalPrice() * 0.000043).toFixed(
                                    2
                                  )}`,
                                },
                              },
                            },
                            items: cart?.map((e) => {
                              return {
                                name: e.title,
                                unit_amount: {
                                  currency_code: "USD",
                                  value: `${(e.price * 0.000043).toFixed(2)}`,
                                },
                                quantity: "1",
                                category: "DIGITAL_GOODS",
                              };
                            }),
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order
                        ? actions.order?.capture().then((detail) => {
                            if (detail.status === "COMPLETED") {
                              toast.success("Thanh toán thành công");
                              enrollHook(
                                cart?.map((e) => e.course_id)
                                  ? cart?.map((e) => e.course_id)
                                  : []
                              );
                              cart?.map((e) => {
                                deleteItem(e.course_id);
                              });
                            } else {
                              toast.error("Thanh toán thất bại");
                            }
                          })
                        : Promise.resolve();
                    }}
                  />
                </PayPalScriptProvider>
              )}
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
