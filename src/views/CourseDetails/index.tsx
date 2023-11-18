/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useMemo } from "react";
import Enroll from "./Enroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { secondsToTime, secondsToTimeString } from "@/utils/convertNumber";
import { useParams } from "react-router-dom";
import { useGetCourse } from "@/hooks/useCourse";
import { useAuth } from "@/hooks/useAuth";

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

const calculateTotalDuration = (units: any[]) => {
  const totalDuration = units.reduce(
    (accumulator: any, unit: { topics: any }) => {
      const topics = unit.topics;
      const unitDuration = topics.reduce(
        (unitAccumulator: any, topic: { duration: any }) => {
          return unitAccumulator + topic.duration;
        },
        0
      );

      return accumulator + unitDuration;
    },
    0
  );
  return totalDuration;
};

const countTotalTopics = (units: any[]) => {
  const totalTopics = units.reduce((accumulator, unit) => {
    return accumulator + unit.topics.length;
  }, 0);

  return totalTopics;
};

function CourseDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetCourse(Number(id));
  const auth = useAuth();

  const totalDuration = useMemo(() => {
    if (data && data.units) {
      return calculateTotalDuration(data.units);
    }
    return 0;
  }, [data]);

  const totalTopics = useMemo(() => {
    if (data && data.units) {
      return countTotalTopics(data.units);
    }
    return 0;
  }, [data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='z-0 px-16 pt-28'>
        {!isLoading && (
          <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2 ml-24'>
              <h1 className='font-bold text-3xl'>{data?.title}</h1>
              <p className='mt-4'>{data?.description}</p>
              <h2 className='font-bold text-xl mt-4'>Nội dung khóa học</h2>
              <p>
                {data?.units?.length} chương • {totalTopics} bài học • Thời
                lượng {secondsToTimeString(totalDuration)}
              </p>
              <div className='min-h-fitscreen'>
                <div className='mb-20 mt-4 border border-b-0 border-gray-300'>
                  <Accordion type='single' collapsible>
                    {data?.units.map(({ title, topics }: any, i: any) => (
                      <AccordionItem value={`unit_${i}`}>
                        <AccordionTrigger className='bg-gray-100 h-12 px-8 hover:no-underline border-b border-gray-300 text-lg font-semibold'>
                          {title}
                        </AccordionTrigger>
                        {topics.map((el: any, i: number) => (
                          <AccordionContent className={`${i == 0 && "pt-4"}`}>
                            <div className='flex justify-between'>
                              <p className='px-14 text-base font-normal'>
                                {el.title}
                              </p>
                              <p className='px-4'>
                                {secondsToTime(Number(el.duration))}
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
            <div>
              <div className='grid place-items-center sticky top-24 mb-40'>
                <div className='mt-2 rounded-xl'>
                  <img
                    src={data?.thumbnail_url}
                    alt='thumbnail course'
                    className='h-48 w-80 rounded-xl'
                  />
                </div>
                <Enroll
                  price={data?.price}
                  id={Number(id)}
                  thumbnail_image={data?.thumbnail_url}
                  title={data?.title}
                  lecturer={data?.instructor_fullname}
                  isEnroll={
                    data?.members_id?.filter(
                      (id: any) => Number(id) === auth.data.id
                    ).length > 0
                  }
                  units={data?.units}
                />
                <div className='mt-4'>
                  <h3 className='text-md font-bold mb-1'>
                    Khóa học này bao gồm
                  </h3>
                  <div className='gap-1'>
                    <p className='ml-4'>
                      Tổng số {data?.units?.length} chương với{" "}
                      {data?.topics?.length} bài học
                    </p>
                    <p className='ml-4'>
                      Thời lượng {secondsToTimeString(totalDuration)}
                    </p>
                    <p className='ml-4'>Học mọi lúc, mọi nơi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CourseDetails;
