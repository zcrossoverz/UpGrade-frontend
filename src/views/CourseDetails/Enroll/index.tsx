/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useEnrollCourse } from "@/hooks/useCourse";
import { formatCurrency } from "@/utils/convertNumber";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Enroll({
  price,
  title,
  id,
  lecturer,
  thumbnail_image,
  isEnroll,
  units,
  lecturer_id,
}: {
  price: number;
  id: number;
  title: string;
  lecturer: string;
  thumbnail_image: string;
  isEnroll: boolean;
  units: any[];
  lecturer_id: number;
}) {
  const { addItem, isCourseInCart, cart } = useCart();
  const { mutateAsync, isLoading } = useEnrollCourse(id);

  const navigate = useNavigate();
  const authHook = useAuth();
  const isExits = useMemo(() => isCourseInCart(id), [cart]);
  const firstUnit = units[0] || [];
  const topics = firstUnit.topics || [];
  return (
    <div>
      <div>
        <div className='text-3xl leading-loose text-center text-red-500'>
          {price > 0 ? formatCurrency(price) : "Miễn phí"}
        </div>
        {authHook.data?.id === lecturer_id ? (
          <>
            <button
              className={`bg-red-500 px-8 py-3 rounded-3xl text-white ${
                isLoading && "opacity-50"
              }`}
              onClick={() => {
                navigate(`/admin/course-management/details/${id}`);
              }}
              disabled={isLoading}
            >
              ĐI TỚI KHÓA HỌC
            </button>
          </>
        ) : (
          <>
            {isEnroll ? (
              topics[0] !== undefined && (
                <button
                  className={`bg-red-500 px-8 py-3 rounded-3xl text-white ${
                    isLoading && "opacity-50"
                  }`}
                  onClick={() => {
                    navigate(`/learning/${id}/${topics[0]?.id}`);
                  }}
                  disabled={isLoading}
                >
                  ĐI TỚI KHÓA HỌC
                </button>
              )
            ) : price === 0 ? (
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
          </>
        )}
      </div>
    </div>
  );
}

export default Enroll;
