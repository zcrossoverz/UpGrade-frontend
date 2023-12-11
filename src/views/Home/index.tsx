/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Billboard from "./Billboard";
import ListCourse from "@/components/ListCourse";
import { useGetListCourses, useGetListRecommend } from "@/hooks/useCourse";
import Loader from "@/components/Loader";
import { PUBLIC_FILTER } from "@/contants/filter";

function HomePage() {
  const { data, isLoading } = useGetListCourses(
    {
      page: 1,
      limit: 8,
      order: {
        key: "id",
        value: "DESC",
      },
      query: [PUBLIC_FILTER],
    },
    "newest"
  );

  const mostEnroll = useGetListCourses(
    {
      page: 1,
      limit: 8,
      order: {
        key: "members_count",
        value: "DESC",
      },
      query: [PUBLIC_FILTER],
    },
    "mostEnroll"
  );

  const recommend = useGetListRecommend({
    page: 1,
    limit: 8,
    query: [PUBLIC_FILTER],
  });

  const mostRate = useGetListCourses(
    {
      page: 1,
      limit: 8,
      order: {
        key: "rate",
        value: "DESC",
      },
      query: [PUBLIC_FILTER],
    },
    "mostRate"
  );

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-36 pt-24'>
        <Billboard />
      </div>
      {!isLoading ? (
        <>
          {recommend?.data && recommend?.data?.length > 0 && (
            <ListCourse
              title='Khóa học gợi ý'
              data={recommend?.data?.map((e: any) => ({
                id: e.id,
                title: e.title,
                lecturer: e.instructor_fullname,
                rate: 5,
                rate_number: 0,
                price: e.price,
                thumbnail_image: e.thumbnail_url,
              }))}
              isEnroll={false}
            />
          )}

          {mostEnroll.data && mostEnroll.data?.datas?.length > 0 && (
            <ListCourse
              title='Học viên xem nhiều nhất'
              data={mostEnroll.data?.datas?.map((e: any) => ({
                id: e.id,
                title: e.title,
                lecturer: e.instructor_fullname,
                rate: Number(e.rate) > 0 ? Number(e.rate) : 5,
                rate_number: e.rate_number,
                price: e.price,
                thumbnail_image: e.thumbnail_url,
              }))}
              isEnroll={false}
            />
          )}
          {mostRate.data && mostRate.data?.datas?.length > 0 && (
            <ListCourse
              title='Khoá học được đánh giá cao nhất'
              data={mostRate.data?.datas?.map((e: any) => ({
                id: e.id,
                title: e.title,
                lecturer: e.instructor_fullname,
                rate: Number(e.rate) > 0 ? Number(e.rate) : 5,
                rate_number: e.rate_number,
                price: e.price,
                thumbnail_image: e.thumbnail_url,
              }))}
              isEnroll={false}
            />
          )}
          <ListCourse
            title='Khóa học mới nhất'
            data={data?.datas?.map((e: any) => ({
              id: e.id,
              title: e.title,
              lecturer: e.instructor_fullname,
              rate: 5,
              rate_number: 0,
              price: e.price,
              thumbnail_image: e.thumbnail_url,
            }))}
            isEnroll={false}
          />
        </>
      ) : (
        <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
          <Loader />
        </div>
      )}
      <div className='mt-10'></div>
      <Footer />
    </div>
  );
}

export default HomePage;
