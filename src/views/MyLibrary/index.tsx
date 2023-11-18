/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseItemLibrary from "@/components/CourseItemLibrary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { useGetLibrary } from "@/hooks/useCourse";
import React from "react";

function MyLibrary() {
  const { data, isLoading } = useGetLibrary();

  console.log(data);

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='pt-28 px-60 min-h-[570px]'>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
            <Loader />
          </div>
        ) : (
          <div>
            {data?.courses ? (
              <>
                <h1 className='mb-8 font-bold text-2xl'>Thư viện của tôi</h1>
                {data?.courses?.map(
                  ({
                    course,
                    currentTopic,
                    topicCompleted,
                  }: {
                    course: any;
                    currentTopic: any;
                    topicCompleted: any;
                  }) => {
                    return (
                      <CourseItemLibrary
                        data={course}
                        currentTopic={currentTopic}
                        topicCompleted={topicCompleted}
                      />
                    );
                  }
                )}
              </>
            ) : (
              <EmptyData />
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MyLibrary;
