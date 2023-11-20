/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import {
  useGetListApproval,
  useProcessApprovalCourse,
} from "@/hooks/useCourse";
import { formatTime } from "@/utils/time";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

function ApprovalRequest() {
  const navigate = useNavigate();

  const [course_id, setCourseId] = useState(-1);

  const approveRequestHook = useProcessApprovalCourse(course_id);

  // pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const [paginationProps, setPagination] = useState({
    currentPage: Number(searchParams.get("page") || 1),
    totalCount: 0,
    pageSize: Number(searchParams.get("pageSize") || 5),
    siblingCount: 1,
  });

  const { data, isLoading, refetch } = useGetListApproval({
    page: paginationProps.currentPage,
    limit: paginationProps.pageSize,
    ...(searchParams.get("search") !== null
      ? {
          query: [
            {
              key: "course_title",
              value: searchParams.get("search"),
            },
          ],
        }
      : {}),
    ...(searchParams.get("status") !== null
      ? {
          explicit: [
            {
              key: "status",
              value: searchParams.get("status"),
            },
          ],
        }
      : {
          explicit: [
            {
              key: "status",
              value: "Pending",
            },
          ],
        }),
    order: {
      key: "id",
      value:
        searchParams.get("order") !== null
          ? searchParams.get("order")!
          : "DESC",
    },
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalCount: Number(data?.count || 0),
    }));
  }, [data?.count]);

  useEffect(() => {
    refetch();
  }, [
    paginationProps.currentPage,
    paginationProps.pageSize,
    searchParams.get("search"),
    searchParams.get("order"),
    searchParams.get("status"),
  ]);

  // end pagination

  return (
    <div className='mt-2 min-h-[350px]'>
      <h1 className='-mt-4'>Quản lý khóa học</h1>
      {isLoading ? (
        <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
          <Loader />
        </div>
      ) : (
        <div>
          <div className='flex mt-4'>
            <div className='border flex'>
              <input
                type='text'
                className='py-[8px] px-4 outline-0'
                placeholder='Tìm kiếm khóa học'
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className='px-3 bg-gray-600 text-white h-[40px] text-md'
                onClick={() =>
                  setSearchParams((prevSearchParams) => {
                    const newParams = new URLSearchParams(prevSearchParams);
                    newParams.set("search", searchQuery);
                    return newParams;
                  })
                }
              >
                <BsSearch />
              </button>
            </div>
            <div className='ml-4 flex'>
              <select
                className='border px-2 py-1 text-sm pr-8'
                onChange={(e) =>
                  setSearchParams((prevSearchParams) => {
                    const newParams = new URLSearchParams(prevSearchParams);
                    newParams.set("order", e.target.value);
                    return newParams;
                  })
                }
              >
                <option value='DESC'>Mới nhất</option>
                <option value='ASC'>Cũ nhất</option>
              </select>
            </div>
            <div className='ml-4 flex'>
              <select
                className='border px-2 py-1 text-sm pr-8'
                onChange={(e) =>
                  setSearchParams((prevSearchParams) => {
                    const newParams = new URLSearchParams(prevSearchParams);
                    newParams.set("status", e.target.value);
                    return newParams;
                  })
                }
              >
                <option value='Pending'>Chưa duyệt</option>
                <option value='Approved'>Chấp thuận</option>
                <option value='Rejected'>Từ chối</option>
              </select>
            </div>
          </div>
          <>
            {data?.count > 0 ? (
              <>
                <div className='flex justify-center mt-4 w-full'>
                  <Table
                    handleForward={(data: any) => {
                      navigate(
                        `/admin/course-management/details/${data.course_id}`
                      );
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
                <Pagination
                  {...paginationProps}
                  next={() => {
                    setSearchParams((prevSearchParams) => {
                      const newParams = new URLSearchParams(prevSearchParams);
                      newParams.set(
                        "page",
                        `${paginationProps.currentPage + 1}`
                      );
                      return newParams;
                    });
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: Number(prev.currentPage) + 1,
                    }));
                  }}
                  prev={() => {
                    setSearchParams((prevSearchParams) => {
                      const newParams = new URLSearchParams(prevSearchParams);
                      newParams.set(
                        "page",
                        `${paginationProps.currentPage - 1}`
                      );
                      return newParams;
                    });
                    setPagination((prevData) => ({
                      ...prevData,
                      currentPage: Number(prevData.currentPage) - 1,
                    }));
                  }}
                  goTo={(page: number) => {
                    setSearchParams((prevSearchParams) => {
                      const newParams = new URLSearchParams(prevSearchParams);
                      newParams.set("page", `${Number(page)}`);
                      return newParams;
                    });
                    setPagination((prevData) => ({
                      ...prevData,
                      currentPage: page,
                    }));
                  }}
                  pageSizeChange={(pageSize: number) => {
                    setSearchParams((prevSearchParams) => {
                      const newParams = new URLSearchParams(prevSearchParams);
                      newParams.set("pageSize", `${Number(pageSize)}`);
                      newParams.set("page", `1`);
                      return newParams;
                    });
                    setPagination((prev) => ({
                      ...prev,
                      pageSize,
                      page: 1,
                    }));
                  }}
                />
              </>
            ) : (
              <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
                <p className='text-gray-600'>Chưa có nội dung nào</p>
              </div>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default ApprovalRequest;
