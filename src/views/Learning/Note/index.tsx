/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import { useCreateNote, useGetNotes } from "@/hooks/useNote";
import { secondsToTime } from "@/utils/convertNumber";
import React, { useState } from "react";

function Note({
  time,
  topic_id,
  jumpToSecond,
  handlePlaying,
}: {
  time: number;
  topic_id: any;
  jumpToSecond: any;
  handlePlaying: any;
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const createNoteHook = useCreateNote();
  const { data, isLoading } = useGetNotes(topic_id);

  return (
    <div>
      <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
        <h3 className='font-semibold text-2xl leading-6 pl-2'>Ghi chú</h3>
        <div className='flex justify-center items-center mt-4'>
          {open ? (
            <div className='w-full flex flex-col'>
              <p className='my-2'>
                Tạo ghi chú mới tại{" "}
                <span className='font-bold'>{secondsToTime(time)}</span>
              </p>
              <textarea
                className='rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white'
                placeholder='Nội dung'
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <div className='w-full flex justify-end px-3 mb-8 mt-4'>
                <button
                  className='px-6 py-1 border bg-gray-200 rounded-md mr-2 hover:bg-gray-300'
                  onClick={() => {
                    setOpen(false);
                    setComment("");
                    handlePlaying(true);
                  }}
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={async () => {
                    await createNoteHook.mutateAsync({
                      topic_id,
                      comment,
                      time,
                    });
                    setOpen(false);
                    setComment("");
                    handlePlaying(true);
                  }}
                  className='group relative inline-flex items-center overflow-hidden rounded-md bg-indigo-500 px-8 py-2 text-white focus:outline-none'
                >
                  <span className='absolute -end-full transition-all group-hover:end-4'>
                    <svg
                      className='h-5 w-5 rtl:rotate-180'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </span>
                  <span className='text-sm font-medium transition-all group-hover:me-4'>
                    Lưu
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <button
              disabled={time == 0}
              className={`py-2 px-4 border border-1 border-black mt-1 flex justify-between items-center w-full mx-32 ${
                time == 0 ? "cursor-not-allowed" : ""
              }`}
              onClick={() => {
                setOpen(true);
                handlePlaying(false);
              }}
            >
              <p className='leading-loose text-md text-md'>
                Tạo ghi chú mới tại {secondsToTime(time)}
              </p>
              <p className='bg-gray-500 px-[8px] py-[1px] rounded-full text-white'>
                +
              </p>
            </button>
          )}
        </div>
        <div className='mt-6 px-8'>
          {isLoading ? (
            <Loader />
          ) : (
            data?.datas?.map((e: any, i: number) => (
              <div className='mb-4 select-none' key={i.toString()}>
                <div className='flex mb-4'>
                  <div className='mr-6'>
                    <button
                      onClick={() => jumpToSecond(e.time)}
                      className='bg-gray-600 px-2 py-1 rounded-xl font-semibold text-white text-sm'
                    >
                      {secondsToTime(e.time)}
                    </button>
                  </div>
                  <div className='bg-gray-100 px-4 py-2 w-full'>
                    {e.comment}
                  </div>
                </div>
                {i !== data?.datas?.length - 1 && <hr />}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Note;
