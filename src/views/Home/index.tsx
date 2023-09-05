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

function HomePage() {
  const courses = [
    {
      title: "NestJS Zero to Hero - Modern TypeScript Back-end Development",
      lecturer: "Ariel Weinberger",
      rate: 4.7,
      rate_number: 8870,
      price: 2499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/2053219_e620_2.jpg",
    },
    {
      title: "Flutter & Dart - The Complete Guide [2023 Edition]",
      lecturer: "Maximilian Schwarzmuller",
      rate: 4.6,
      rate_number: 66719,
      price: 1499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1708340_7108_5.jpg",
    },
    {
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 86437,
      price: 2899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
    },
    {
      title: "The Complete 2023 Web Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 317895,
      price: 2199000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    },
    {
      title: "The Ultimate Guide to Game Development with Unity (Official)",
      lecturer: "Dr. Jonathan",
      rate: 4.2,
      rate_number: 7895,
      price: 899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg",
    },
    {
      title: "TensorFlow Developer Certificate in 2023: Zero to Mastery",
      lecturer: "Dr. Davis",
      rate: 4.4,
      rate_number: 9895,
      price: 1899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/3693164_f87d_3.jpg",
    },
  ];

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-36 pt-28'>
        <Billboard />
      </div>
      <ListCourse title='Học viên đang xem' data={courses} />
      <ListCourse title='Khóa học mới cập nhật' data={courses} />
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
