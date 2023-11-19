/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Footer from "@/components/Footer";
import CourseContent from "./CourseContent";
import InfoContent from "./InfoContent";
import Comment from "./Comment";
import Note from "./Note";
import Review from "./Review";
import { Link, useParams } from "react-router-dom";
import { useGetCourse, useGetTopic } from "@/hooks/useCourse";
import Badge from "@/components/Badge";
import Loader from "@/components/Loader";

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
    title: "Tổng quan khóa học",
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

const Player = memo(
  ({
    configPlayer,
    data,
    playerRef,
    playing,
  }: {
    configPlayer: any;
    data: any;
    playerRef: any;
    playing: boolean;
  }) => {
    return (
      <div className='h-[500px] bg-gray-800'>
        <ReactPlayer
          width='100%'
          height='100%'
          {...configPlayer}
          playing={playing}
          url={data?.video_url}
          onReady={(player: ReactPlayer) => (playerRef.current = player)}
        />
      </div>
    );
  }
);

function Learning() {
  const { topic_id, course_id } = useParams();
  const [tabs, setTabs] = useState<EnumTab>(EnumTab.CONTENT);
  const [time, setTime] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const playerRef = useRef<ReactPlayer | null>(null);

  const { data, isLoading } = useGetTopic(Number(topic_id));
  const [playing, setPlaying] = useState({
    playing: true,
    controls: true,
  });
  const courseData = useGetCourse(Number(course_id));

  const configPlayer = {
    controls: playing.controls,
    onProgress: (e: any) => {
      setTime(Math.round(e.playedSeconds));
    },
  };

  const jumpToSecond = (second: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(second);
    }
  };

  return (
    <div className='bg-white'>
      {!isLoading && (
        <>
          <div className='grid grid-cols-2 h-12 bg-light_gray text-white'>
            <div className='flex items-center'>
              <Link className='ml-8' to={"/"}>
                Trở về
              </Link>
              <p className='ml-12'>{data?.title}</p>
            </div>
            {data?.status === "private" && (
              <div className='flex items-center justify-end mr-12'>
                <Badge
                  color='text-red-700'
                  bgColor='bg-red-100'
                  text='Chưa xuất bản'
                />
              </div>
            )}
          </div>
          {isLoading ? (
            <div className='h-[500px] flex items-center justify-center'>
              <Loader />
            </div>
          ) : (
            <Player
              configPlayer={configPlayer}
              data={data}
              playerRef={playerRef}
              playing={playing.playing}
            />
          )}
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
                <CourseContent courseData={courseData.data} />
              )}
              {tabs === EnumTab.INFO && <InfoContent data={courseData?.data} />}
              {tabs === EnumTab.COMMENTS && (
                <Comment author_id={courseData?.data?.instructor_id} />
              )}
              {tabs === EnumTab.NOTE && (
                <Note
                  time={time}
                  topic_id={topic_id}
                  jumpToSecond={jumpToSecond}
                  handlePlaying={(play: boolean) => {
                    if (play) {
                      setPlaying({
                        playing: true,
                        controls: true,
                      });
                    } else {
                      setPlaying({
                        playing: false,
                        controls: false,
                      });
                    }
                  }}
                />
              )}
              {tabs === EnumTab.REVIEW && <Review />}
            </div>
          </div>
        </>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Learning;
