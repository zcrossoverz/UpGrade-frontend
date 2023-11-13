/* eslint-disable react-hooks/exhaustive-deps */
import { useCart } from "@/hooks/useCart";
import { useEnrollCourse } from "@/hooks/useCourse";
import { formatCurrency } from "@/utils/convertNumber";
import React, { useMemo } from "react";

function Enroll({
  price,
  title,
  id,
  lecturer,
  thumbnail_image,
}: {
  price: number;
  id: number;
  title: string;
  lecturer: string;
  thumbnail_image: string;
}) {
  const { addItem, isCourseInCart, cart } = useCart();
  const { mutateAsync, isLoading } = useEnrollCourse(id);

  const isExits = useMemo(() => isCourseInCart(id), [cart]);
  return (
    <div>
      <div>
        <div className='text-3xl leading-loose text-center text-red-500'>
          {price > 0 ? formatCurrency(price) : "Miễn phí"}
        </div>
        {price === 0 ? (
          <button
            className={`bg-red-500 px-8 py-3 rounded-3xl text-white ${
              isLoading && "opacity-50"
            }`}
            onClick={() => {
              mutateAsync({
                course_id: id,
              });
            }}
            disabled={isLoading}
          >
            ĐĂNG KÝ NGAY
          </button>
        ) : (
          <button
            className={`bg-red-500 px-8 py-3 rounded-3xl text-white ${
              isExits && "opacity-50"
            }`}
            onClick={() => {
              addItem({
                course_id: id,
                price,
                title,
                lecturer,
                thumbnail_image,
              });
            }}
            disabled={isExits}
          >
            {isExits ? "ĐÃ THÊM VÀO GIỎ HÀNG" : "THÊM VÀO GIỎ HÀNG"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Enroll;
