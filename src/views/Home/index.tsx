/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Billboard from "./Billboard";
import ListCourse from "@/components/ListCourse";
import {
  BsCodeSquare,
  BsBuilding,
  BsCapsule,
  BsWechat,
  BsDatabase,
} from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaMoneyBill } from "react-icons/fa";
import { TbWriting } from "react-icons/tb";
import { useGetListCourses, useGetListRecommend } from "@/hooks/useCourse";
import { useSearchParams } from "react-router-dom";
import Loader from "@/components/Loader";
import { PUBLIC_FILTER } from "@/contants/filter";

function HomePage() {
  const [searchParams] = useSearchParams();

  const filter = {
    ...(searchParams.get("page") !== null
      ? { page: searchParams.get("page") }
      : {}),
    ...(searchParams.get("limit") !== null
      ? { limit: searchParams.get("limit") }
      : {}),
    ...(searchParams.get("order_by") !== null &&
    searchParams.get("order_direction") !== null
      ? {
          order: {
            [searchParams.get("order_by") as string]:
              searchParams.get("order_direction"),
          },
        }
      : {}),
    ...(searchParams.get("search") !== null
      ? {
          query: [
            {
              key: "title",
              value: searchParams.get("search"),
            },
            PUBLIC_FILTER,
          ],
        }
      : {
          query: [PUBLIC_FILTER],
        }),
  };

  const { data, isLoading } = useGetListCourses(filter);

  const recommend = useGetListRecommend({
    page: 1,
    limit: 8,
    query: [PUBLIC_FILTER],
  });

  console.log(recommend.data);

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

          <ListCourse
            title='Học viên đang xem'
            data={data?.datas?.map((e: any) => ({
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
          <ListCourse
            title='Khóa học mới cập nhật'
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
      <div>
        <p className='px-32 py-4 text-2xl font-bold'>Các lĩnh vực hàng đầu</p>
        <div className='flex flex-wrap gap-x-14 gap-y-4 justify-center content-center mx-32 pt-0 pb-14'>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-emerald-400/25 hover:bg-emerald-500/70 text-emerald-500 hover:text-white transition duration-300 ease-out'>
            <BsCodeSquare className='text-5xl' />
            <p className='ml-4 p-4 text-xl'>Phần mềm</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-red-400/25 hover:bg-red-500/70 text-red-500 hover:text-white transition duration-300 ease-out'>
            <BsBuilding className='text-5xl' />
            <p className='ml-4 p-4'>Kinh doanh</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-emerald-400/25 hover:bg-emerald-500/70 text-emerald-500 hover:text-white transition duration-300 ease-out'>
            <MdOutlineDesignServices className='text-5xl' />
            <p className='ml-4 p-4'>Thiết kế</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-yellow-400/25 hover:bg-yellow-500/70 text-yellow-500 hover:text-white transition duration-300 ease-out'>
            <BsCapsule className='text-5xl' />
            <p className='ml-4 p-4'>Sức khỏe</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-violet-400/25 hover:bg-violet-500/70 text-violet-500 hover:text-white transition duration-300 ease-out'>
            <HiOutlineDesktopComputer className='text-5xl' />
            <p className='ml-4 p-4'>Computer Science</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-pink-400/25 hover:bg-pink-500/70 text-pink-500 hover:text-white transition duration-300 ease-out'>
            <BsWechat className='text-5xl' />
            <p className='ml-4 p-4'>Marketing</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-blue-400/25 hover:bg-blue-500/70 text-blue-500 hover:text-white transition duration-300 ease-out'>
            <FaMoneyBill className='text-5xl' />
            <p className='ml-4 p-4'>Tài chính</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-lime-400/25 hover:bg-lime-500/70 text-lime-500 hover:text-white transition duration-300 ease-out'>
            <BsDatabase className='text-5xl' />
            <p className='ml-4 p-4'>Data Science</p>
          </div>
          <div className='flex items-center rounded-lg px-4 py-3 w-80 bg-sky-400/25 hover:bg-sky-500/70 text-sky-500 hover:text-white transition duration-300 ease-out'>
            <TbWriting className='text-5xl' />
            <p className='ml-4 p-4'>Writting</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
