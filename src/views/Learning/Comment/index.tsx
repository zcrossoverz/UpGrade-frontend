/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import CommentItem from "./CommentItem";
import { useGetComments } from "@/hooks/useComment";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import EmptyData from "@/components/EmptyData";

function Comment() {
  const { topic_id } = useParams();
  const { data, isLoading } = useGetComments(Number(topic_id));
  console.log(data);

  return (
    <div>
      <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
        <h3 className='font-semibold text-2xl leading-6 pl-2'>Thảo luận</h3>
        <div className='flex flex-col gap-2 m-3'>
          <div className='w-full px-3 mt-6'>
            <textarea
              className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white'
              name='body'
              placeholder='Comment'
              required
            ></textarea>
          </div>
          <div className='w-full flex justify-end px-3 mb-8'>
            <input
              type='submit'
              className='px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 text-lg'
              value='Post Comment'
            />
          </div>
          <div>
            {isLoading ? (
              <Loader />
            ) : data && data.datas?.length > 0 ? (
              data.datas?.map((e: any, i: number) => (
                <CommentItem
                  key={i.toString()}
                  user_fullname={e.user_fullname}
                  user_avatar={e.user_avatar}
                  user_email={e.user_email}
                  text={e.text}
                  likes={e.likes}
                  dislikes={e.dislikes}
                  children={e.children}
                />
              ))
            ) : (
              <EmptyData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
