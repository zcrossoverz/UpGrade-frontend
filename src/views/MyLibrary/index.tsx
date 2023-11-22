/* eslint-disable @typescript-eslint/no-explicit-any */
import CourseItemLibrary from "@/components/CourseItemLibrary";
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { useGetLibrary } from "@/hooks/useCourse";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function MyLibrary() {
  // pagination
  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationProps, setPagination] = useState({
    currentPage: Number(searchParams.get("page") || 1),
    totalCount: 0,
    pageSize: Number(searchParams.get("pageSize") || 5),
    siblingCount: 1,
  });

  const { data, isLoading, refetch } = useGetLibrary({
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
                {/* <div className='flex mt-4'>
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
                          const newParams = new URLSearchParams(
                            prevSearchParams
                          );
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
                          const newParams = new URLSearchParams(
                            prevSearchParams
                          );
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
                          const newParams = new URLSearchParams(
                            prevSearchParams
                          );
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
                </div> */}
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
                        key={course.id}
                        data={course}
                        currentTopic={currentTopic}
                        topicCompleted={topicCompleted}
                      />
                    );
                  }
                )}
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
