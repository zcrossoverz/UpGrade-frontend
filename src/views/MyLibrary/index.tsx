import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListCourse from "@/components/ListCourse";
import React from "react";

function MyLibrary() {
  const courses = [
    {
      id: 8,
      title: "NestJS Zero to Hero - Modern TypeScript Back-end Development",
      lecturer: "Ariel Weinberger",
      rate: 4.7,
      rate_number: 8870,
      price: 2499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/2053219_e620_2.jpg",
    },
    {
      id: 7,
      title: "Flutter & Dart - The Complete Guide [2023 Edition]",
      lecturer: "Maximilian Schwarzmuller",
      rate: 4.6,
      rate_number: 66719,
      price: 1499000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1708340_7108_5.jpg",
    },
    {
      id: 5,
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 86437,
      price: 2899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1778502_f4b9_12.jpg",
    },
    {
      id: 3,

      title: "The Complete 2023 Web Development Bootcamp",
      lecturer: "Dr. Angela Yu",
      rate: 4.7,
      rate_number: 317895,
      price: 2199000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
    },
    {
      id: 1,
      title: "The Ultimate Guide to Game Development with Unity (Official)",
      lecturer: "Dr. Jonathan",
      rate: 4.2,
      rate_number: 7895,
      price: 899000,
      thumbnail_image:
        "https://img-c.udemycdn.com/course/240x135/1328572_b05d_5.jpg",
    },
    {
      id: 1,
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
      <div className='pt-28'>
        <ListCourse title='Khoá học của tôi' data={courses} isEnroll={true} />
      </div>
      <Footer />
    </div>
  );
}

export default MyLibrary;
