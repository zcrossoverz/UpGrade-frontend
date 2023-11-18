/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/Avatar";
import { commentTime, convertTimestamp } from "@/utils/time";
import React, { useMemo } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

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

export default ReviewCartItem;
