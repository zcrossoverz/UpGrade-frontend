import { formatCurrency, formatNumber } from "@/utils/convertNumber";
import React, { useMemo } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

interface ICourse {
  title: string;
  lecturer: string;
  rate: number;
  rate_number: number;
  price: number;
  thumbnail_image: string;
}

function CourseContainer({
  title,
  lecturer,
  rate,
  rate_number,
  price,
  thumbnail_image,
}: ICourse) {
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
  }, []);

  return (
    <div className=''>
      <div className='relative border border-gray-300 w-60 hover:cursor-pointer'>
        <div
          className='h-32'
          style={{
            backgroundImage: `url(${thumbnail_image})`,
          }}
        />
        <div className='absolute inset-0 bg-black bg-opacity-0 h-full hover:bg-opacity-60'>
          <div className='flex items-center justify-center px-30 w-full h-full opacity-0 hover:opacity-100 hover:scale-105 transition duration-500 ease-out rounded-2xl'>
            <p className='bg-white px-4 py-1 rounded-2xl'>Xem khóa học</p>
          </div>
        </div>
      </div>
      <p className='mt-2 font-bold text-lg line-clamp-2 hover:cursor-pointer'>
        {title}
      </p>
      <p className='text-sm text-gray-400'>{lecturer}</p>
      <div>
        <div className='flex mt-2'>
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
          <div className='ml-2 mt-1 text-sm text-gray-500'>{`(${formatNumber(
            rate_number
          )})`}</div>
        </div>
      </div>
      <p className='mt-2 text-lg font-bold'>{formatCurrency(price)}</p>
    </div>
  );
}

export default CourseContainer;
