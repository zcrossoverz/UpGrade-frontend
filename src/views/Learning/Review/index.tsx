/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/Avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  useCreateReview,
  useGetReviews,
  useUpdateReview,
} from "@/hooks/useReview";
import { commentTime, convertTimestamp } from "@/utils/time";
import React, { useEffect, useMemo, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";

const ReviewCartItem = ({
  comment,
  rate,
  reviewer_avatar,
  reviewer_email,
  reviewer_fullname,
  created_at,
  isMe,
  handleEdit,
}: {
  comment: string;
  rate: number;
  reviewer_avatar: string;
  reviewer_email: string;
  reviewer_fullname: string;
  created_at: string;
  isMe: boolean;
  handleEdit: any;
}) => {
  const starArr = useMemo(() => {
    const fullStar = "full";
    const emptyStar = "empty";
    const halfStar = "half";

    const roundedRating = Math.round(rate * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStarPresent = fullStars < roundedRating;
    const emptyStars = 5 - fullStars - (halfStarPresent ? 1 : 0);

    let stars = Array(fullStars).fill(fullStar);
    if (halfStarPresent) {
      stars.push(halfStar);
    }
    stars = stars.concat(Array(emptyStars).fill(emptyStar));

    return stars;
  }, [rate]);

  return (
    <div
      className={`flex items-start ${
        isMe && "bg-amber-100/30 rounded-2xl px-4 py-8"
      }`}
    >
      <div className='flex-shrink-0'>
        <div className='inline-block relative'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden'>
            <Avatar size={16} avatar={reviewer_avatar} />
          </div>
          <svg
            className='fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z' />
          </svg>
        </div>
      </div>
      <div className='ml-6 w-full'>
        <p className='flex items-baseline'>
          <span className='text-gray-600 font-bold'>{reviewer_fullname}</span>
          <p className='ml-2 text-sm text-gray-400'>•</p>
          <span className='ml-2 text-sm text-gray-400'>
            {commentTime(convertTimestamp(created_at))}
          </span>
          <div className='flex ml-auto'>
            {isMe && (
              <button
                className='px-4 py-1 border rounded-3xl bg-white'
                onClick={handleEdit}
              >
                chỉnh sửa
              </button>
            )}
          </div>
        </p>
        <p className='text-gray-400 text-sm'>{reviewer_email}</p>
        <div className='flex items-center mt-1'>
          {starArr.map((e, i) => {
            if (e === "full")
              return (
                <BsStarFill
                  key={i.toString()}
                  className='h-6 text-yellow-600'
                />
              );
            if (e === "half")
              return (
                <BsStarHalf
                  key={i.toString()}
                  className='h-6 text-yellow-600'
                />
              );
            if (e === "empty")
              return (
                <BsStar key={i.toString()} className='h-6 text-yellow-600' />
              );
          })}
        </div>
        <div className='mt-2'>
          <p className='mt-1'>{comment}</p>
        </div>
      </div>
    </div>
  );
};

function Review() {
  const { course_id } = useParams();
  const authHook = useAuth();
  const { data, isLoading, isAlreadyReview } = useGetReviews(
    Number(course_id),
    authHook.data.id
  );
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [form, setForm] = useState({
    isOpen: !isAlreadyReview,
    isEdit: isAlreadyReview,
    id: -1,
  });

  const starArr = useMemo(() => {
    const fullStar = "full";
    const emptyStar = "empty";
    const halfStar = "half";

    const roundedRating = Math.round(rate * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStarPresent = fullStars < roundedRating;
    const emptyStars = 5 - fullStars - (halfStarPresent ? 1 : 0);

    let stars = Array(fullStars).fill(fullStar);
    if (halfStarPresent) {
      stars.push(halfStar);
    }
    stars = stars.concat(Array(emptyStars).fill(emptyStar));

    return stars;
  }, [rate]);

  useEffect(() => {
    setForm({
      isOpen: !isAlreadyReview,
      isEdit: isAlreadyReview,
      id: -1,
    });
    if (data && data.datas) {
      const item = data.datas.find(
        ({ reviewer_id }: { reviewer_id: number }) =>
          reviewer_id === authHook.data.id
      );
      if (item) {
        setComment(item.comment);
        setRate(item.rate);
        setForm((prev) => ({
          ...prev,
          id: item.id,
        }));
      }
    }
  }, [isAlreadyReview, data]);

  const reviewHook = useCreateReview();
  const updateReviewHook = useUpdateReview();

  return (
    <div>
      <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
        <h3 className='font-semibold text-2xl leading-6 pl-2'>Đánh giá</h3>
        <div className='flex flex-col gap-2 m-3'>
          {form.isOpen && (
            <div>
              <div className='w-full px-2 mt-2'>
                <div className=''>
                  <p>Bạn có hài lòng với khóa học? hãy để lại đánh giá nào!!</p>
                  <div className='mb-2 mt-1 flex text-2xl gap-1'>
                    {starArr.map((e, i) => {
                      if (e === "full")
                        return (
                          <button onClick={() => setRate(i + 1)}>
                            <svg
                              className='w-6 h-6 fill-current text-yellow-600'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                            >
                              <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                            </svg>
                          </button>
                        );
                      if (e === "empty")
                        return (
                          <button onClick={() => setRate(i + 1)}>
                            <svg
                              className='w-6 h-6 fill-current text-gray-300'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                            >
                              <path d='M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z' />
                            </svg>
                          </button>
                        );
                    })}
                  </div>
                </div>
                <textarea
                  className='mt-1 rounded border border-gray-400 leading-normal resize-none w-full h-24 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white'
                  name='body'
                  placeholder='Nội dung...'
                  defaultValue={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className='w-full flex justify-end px-3 mb-8'>
                {form.isEdit && (
                  <button
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        isOpen: false,
                      }));
                    }}
                    className='mr-4 group relative inline-flex items-center overflow-hidden rounded-md bg-gray-500 px-8 py-2 text-white focus:outline-none'
                  >
                    Hủy bỏ
                  </button>
                )}
                <button
                  onClick={async () => {
                    if (!form.isEdit) {
                      await reviewHook.mutateAsync({
                        course_id,
                        rate,
                        comment,
                      });
                      setComment("");
                      setRate(0);
                    } else {
                      await updateReviewHook.mutateAsync({
                        id: form.id,
                        rate,
                        comment,
                      });
                      setForm((prev) => ({
                        ...prev,
                        isOpen: false,
                      }));
                    }
                  }}
                  disabled={reviewHook.isLoading}
                  className='group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-500 px-8 py-2 text-white focus:outline-none'
                >
                  <span className='absolute -end-full transition-all group-hover:end-4'>
                    <svg
                      className='h-5 w-5 rtl:rotate-180'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>

                  <span className='text-sm font-medium transition-all group-hover:me-4'>
                    {reviewHook.isLoading
                      ? "Đang gửi..."
                      : form.isEdit
                      ? "Cập nhật"
                      : "Để lại đánh giá"}
                  </span>
                </button>
              </div>
            </div>
          )}
          <div className='px-6 mt-4'>
            {!isLoading &&
              data?.datas?.map((e: any, i: number) => (
                <>
                  <div className='mb-4'>
                    <ReviewCartItem
                      key={i.toString()}
                      comment={e.comment}
                      reviewer_avatar={e.reviewer_avatar}
                      reviewer_email={e.reviewer_email}
                      reviewer_fullname={e.reviewer_fullname}
                      rate={e.rate}
                      created_at={e.created_at}
                      isMe={e.reviewer_id === authHook.data.id}
                      handleEdit={() =>
                        setForm((prev) => ({ ...prev, isOpen: true }))
                      }
                    />
                  </div>
                  {i !== data?.datas?.length - 1 && <hr className='mb-4' />}
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
