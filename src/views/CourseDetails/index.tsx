import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Enroll from "./Enroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import courseApi from "@/apis/course.api";
import { secondsToTime, secondsToTimeString } from "@/utils/convertNumber";

type Topic = {
  id: number;
  title: string;
  attributes: {
    type: string;
    length: string;
  };
};

type Unit = {
  id: number;
  title: string;
  topics: Topic[];
};

export type Course = {
  title: string;
  description: string;
  price: number;
  units: Unit[];
  topicsCount: number;
  unitsCount: number;
  totalTimeCount: number;
};

function CourseDetails() {
  const [courseData, setCourseData] = useState<Course>();

  useEffect(() => {
    const getData = async () => {
      const data = await courseApi.getCourseDetail();
      setCourseData(data);
      console.log("set course data");
    };
    getData();
  }, []);

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-16 pt-28'>
        <div className='grid grid-cols-3 gap-4'>
          {courseData && (
            <div className='col-span-2 ml-24'>
              <h1 className='font-bold text-3xl'>{courseData?.title}</h1>
              <p className='mt-4'>{courseData?.description}</p>
              <h2 className='font-bold text-xl mt-4'>Nội dung khóa học</h2>
              <p>
                {courseData.unitsCount} chương • {courseData.topicsCount} bài
                học • Thời lượng{" "}
                {secondsToTimeString(courseData.totalTimeCount)}
              </p>
              <div className='min-h-fitscreen'>
                <div className='mb-20 mt-4 border border-b-0 border-gray-300'>
                  <Accordion type='single' collapsible>
                    {courseData?.units.map(({ title, topics }, i) => (
                      <AccordionItem value={`unit_${i}`}>
                        <AccordionTrigger className='bg-gray-100 h-12 px-8 hover:no-underline border-b border-gray-300 text-lg font-semibold'>
                          {title}
                        </AccordionTrigger>
                        {topics.map((el, i) => (
                          <AccordionContent className={`${i == 0 && "pt-4"}`}>
                            <div className='flex justify-between'>
                              <p className='px-14 text-base font-normal'>
                                {el.title}
                              </p>
                              <p className='px-4'>
                                {secondsToTime(Number(el.attributes.length))}
                              </p>
                            </div>
                          </AccordionContent>
                        ))}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          )}
          <div>
            {courseData && (
              <div className='grid place-items-center sticky top-24 mb-40'>
                <div className='bg-gray-300 h-48 w-80 mt-2 rounded-xl'></div>
                <Enroll price={courseData.price} id={0} />
                <div className='mt-4'>
                  <h3 className='text-md font-bold mb-1'>
                    Khóa học này bao gồm
                  </h3>
                  <div className='gap-1'>
                    <p className='ml-4'>
                      Tổng số {courseData.unitsCount} chương với{" "}
                      {courseData.topicsCount} bài học
                    </p>
                    <p className='ml-4'>
                      Thời lượng{" "}
                      {secondsToTimeString(courseData.totalTimeCount)}
                    </p>
                    <p className='ml-4'>Học mọi lúc, mọi nơi</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetails;
