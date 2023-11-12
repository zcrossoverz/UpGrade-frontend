/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import {
  useGetListApproval,
  useProcessApprovalCourse,
} from "@/hooks/useCourse";
import { formatTime } from "@/utils/time";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApprovalRequest() {
  const { data, isLoading } = useGetListApproval();
  const navigate = useNavigate();

  const [course_id, setCourseId] = useState(-1);

  const approveRequestHook = useProcessApprovalCourse(course_id);

  return (
    <div className='mt-2 min-h-[350px]'>
      <h1 className='-mt-4'>Quản lý khóa học</h1>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
          <Loader />
        </div>
      ) : data?.count > 0 ? (
        <div className='flex justify-center mt-6 w-full'>
          <Table
            handleForward={(data: any) => {
              navigate(`/admin/course-management/details/${data.course_id}`);
            }}
            handleTick={async (data: any) => {
              setCourseId(data.course_id);
              await approveRequestHook.mutateAsync({
                course_id: data.id,
                isAccept: true,
              });
            }}
            handleCancel={async (data: any) => {
              setCourseId(data.course_id);
              await approveRequestHook.mutateAsync({
                course_id: data.id,
                isAccept: false,
              });
            }}
            data={data?.datas?.map(
              (
                e: {
                  course_title: string;
                  instructor_id: string;
                  course_id: string;
                  status: string;
                  created_at: string;
                  updated_at: string;
                  id: number;
                },
                i: number
              ) => ({
                order: (i + 1).toString(),
                course_title: e.course_title,
                updateDate: formatTime(e.updated_at),
                createDate: formatTime(e.created_at),
                status:
                  (e.status === "Pending" && (
                    <Badge
                      text='Chờ duyệt'
                      color='text-yellow-700'
                      bgColor='bg-yellow-200'
                    />
                  )) ||
                  (e.status === "Approved" && (
                    <Badge
                      text='Chấp thuận'
                      color='text-green-700'
                      bgColor='bg-green-200'
                    />
                  )) ||
                  (e.status === "Rejected" && (
                    <Badge
                      text='Từ chối'
                      color='text-red-700'
                      bgColor='bg-red-200'
                    />
                  )),
                course_id: e.course_id,
                id: e.id,
              })
            )}
            headerLabel={[
              {
                key: "order",
                title: "#",
              },
              {
                key: "course_title",
                title: "Tiêu đề",
              },
              {
                key: "status",
                title: "Tình trạng",
              },
              {
                key: "updateDate",
                title: "CẬP NHẬT LÚC",
              },
              {
                key: "createDate",
                title: "KHỞI TẠO LÚC",
              },
            ]}
          />
        </div>
      ) : (
        <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
          <p className='text-gray-600'>Chưa có nội dung nào</p>
        </div>
      )}
    </div>
  );
}

export default ApprovalRequest;
