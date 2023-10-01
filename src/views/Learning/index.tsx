import React, { useEffect, useState } from "react";
import { Course } from "../CourseDetails";
import courseApi from "@/apis/course.api";
import ReactPlayer from "react-player";
import Footer from "@/components/Footer";
import CourseContent from "./CourseContent";
import InfoContent from "./InfoContent";
import Comment from "./Comment";
import Note from "./Note";
import Review from "./Review";
import { Link } from "react-router-dom";

enum EnumTab {
  CONTENT,
  INFO,
  COMMENTS,
  NOTE,
  REVIEW,
}

const tabList = [
  {
    title: "Nội dung khóa học",
    tab: EnumTab.CONTENT,
  },
  {
    title: "Thông tin khóa học",
    tab: EnumTab.INFO,
  },
  {
    title: "Bình luận",
    tab: EnumTab.COMMENTS,
  },
  {
    title: "Ghi chú",
    tab: EnumTab.NOTE,
  },
  {
    title: "Đánh giá",
    tab: EnumTab.REVIEW,
  },
];

function Learning() {
  // const params = useParams();

  const [courseData, setCourseData] = useState<Course>();
  const [tabs, setTabs] = useState<EnumTab>(EnumTab.CONTENT);

  useEffect(() => {
    const getData = async () => {
      const data = await courseApi.getCourseDetail();
      setCourseData(data);
      console.log("set course data");
    };
    getData();
  }, []);

  const configPlayer = {
    controls: true,
  };

  return (
    <div className='bg-white'>
      <div className='grid grid-cols-2 h-12 bg-light_gray text-white'>
        <div className='flex items-center'>
          <Link className='ml-8' to={"/"}>
            Trở về
          </Link>
          <p className='ml-12'>Typescript quickstart</p>
        </div>
        <div className='flex items-center justify-end'>
          <p className='mr-8'>Tiến độ của bạn</p>
        </div>
      </div>
      <div className='h-[500px]'>
        <ReactPlayer
          width='100%'
          height='100%'
          {...configPlayer}
          url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
          // url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        />
      </div>
      <div>
        <div className='text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
          <ul className='flex flex-wrap justify-center'>
            {tabList.map(({ title, tab }, i) => (
              <li className='mr-2' key={i.toString()}>
                <button
                  className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                    tabs === tab
                      ? "text-blue-600 active border-blue-600"
                      : "hover:text-gray-600 hover:border-gray-300"
                  }`}
                  onClick={() => setTabs(tab)}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='px-40 mt-10 mb-10'>
          {tabs === EnumTab.CONTENT && (
            <CourseContent courseData={courseData} />
          )}
          {tabs === EnumTab.INFO && <InfoContent />}
          {tabs === EnumTab.COMMENTS && <Comment />}
          {tabs === EnumTab.NOTE && <Note />}
          {tabs === EnumTab.REVIEW && <Review />}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Learning;
