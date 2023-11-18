/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CommentItem from "./CommentItem";
import { useCreateComment, useGetComments } from "@/hooks/useComment";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import EmptyData from "@/components/EmptyData";

function Comment({ author_id }: { author_id: number }) {
  const { topic_id } = useParams();
  const { data, isLoading } = useGetComments(Number(topic_id));
  const [parentReply, setParentReply] = useState({
    id: -1,
    user_fullname: "",
  });
  const [comment, setComment] = useState("");

  const createCommentHook = useCreateComment();

  return (
    <div>
      <div className='w-fullbg-white rounded-lg p-1 md:p-3 m-10'>
        <h3 className='font-semibold text-2xl leading-6 pl-2'>Thảo luận</h3>
        <div className='flex flex-col gap-2 m-3'>
          <div className='w-full px-3 mt-6'>
            {parentReply.id > 0 && (
              <p className='mb-1 flex'>
                <p className='mr-2'>Trả lời bình luận của </p>
                <p className='font-bold'>{parentReply.user_fullname}</p>
                <p>?</p>
                <button
                  onClick={() => setParentReply({ id: -1, user_fullname: "" })}
                  className='ml-2 text-red-600 px-2'
                >
                  Hủy bỏ
                </button>
              </p>
            )}
            <textarea
              className='rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-indigo-600 focus:bg-white'
              placeholder='Nội dung'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>
          <div className='w-full flex justify-end px-3 mb-8'>
            <button
              onClick={async () => {
                await createCommentHook.mutateAsync({
                  topic_id,
                  text: comment,
                  ...(parentReply.id > 0 ? { parent_id: parentReply.id } : {}),
                });
                setComment("");
                setParentReply({
                  id: -1,
                  user_fullname: "",
                });
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
                {createCommentHook.isLoading ? "Đang gửi..." : "Bình luận"}
              </span>
            </button>
          </div>
          <div>
            {isLoading ? (
              <Loader />
            ) : data && data.datas?.length > 0 ? (
              data.datas?.map((e: any, i: number) => (
                <CommentItem
                  key={i.toString()}
                  id={e.id}
                  user_fullname={e.user_fullname}
                  user_avatar={e.user_avatar}
                  user_email={e.user_email}
                  text={e.text}
                  likes={e.likes}
                  dislikes={e.dislikes}
                  created_at={e.created_at}
                  children={e.children}
                  author_id={author_id}
                  user_id={e.user_id}
                  isAdmin={e.user_role === "admin"}
                  handleReply={(comment_id: number, user_fullname: string) =>
                    setParentReply({
                      id: comment_id,
                      user_fullname,
                    })
                  }
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
