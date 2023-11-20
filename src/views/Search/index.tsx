/* eslint-disable @typescript-eslint/no-explicit-any */
import EmptyData from "@/components/EmptyData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { useGetListCourses } from "@/hooks/useCourse";
import { formatTime } from "@/utils/time";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationProps, setPagination] = useState({
    currentPage: Number(searchParams.get("page") || 1),
    totalCount: 0,
    pageSize: Number(searchParams.get("pageSize") || 5),
    siblingCount: 1,
  });

  const { data, isLoading, refetch } = useGetListCourses(
    {
      page: paginationProps.currentPage,
      limit: paginationProps.pageSize,
      ...(searchParams.get("q") !== null
        ? {
            query: [
              {
                key: "title",
                value: searchParams.get("q"),
              },
            ],
          }
        : {}),
      order: {
        key: "id",
        value:
          searchParams.get("order") !== null
            ? searchParams.get("order")!
            : "DESC",
      },
    },
    "search_page"
  );

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
    searchParams.get("q"),
  ]);

  const navigate = useNavigate();

  return (
    <div className='bg-white'>
      <div className='shadow-md z-40 fixed w-full'>
        <Header />
      </div>
      <div className='pt-28 px-60 min-h-[570px]'>
        <h1 className='mb-8 font-bold text-2xl'>
          {searchParams.get("q")
            ? `${data?.count} kết quả tìm kiếm cho ${searchParams.get("q")}`
            : "Tìm kiếm"}
        </h1>
        {isLoading ? (
          <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
            <Loader />
          </div>
        ) : (
          <div>
            {data?.datas.length > 0 ? (
              <div>
                <>
                  {data?.datas?.map((data: any) => {
                    return (
                      <div className='flex border-[1px] border-gray-200 mt-4 select-none z-10'>
                        <div>
                          <LazyLoadImage
                            alt='placeholder-course'
                            height={110}
                            width={234}
                            src={data?.thumbnail_url}
                          />
                        </div>
                        <div className='relative flex flex-col w-full justify-between pl-6 pt-2'>
                          <div className='flex justify-between -mt-1'>
                            <button
                              className='text-lg font-semibold'
                              onClick={() =>
                                navigate(`/course-details/${data?.id}`)
                              }
                            >
                              {data?.title}
                            </button>
                            <p className='mr-4'>
                              {formatTime(data?.created_at)}
                            </p>
                          </div>
                          <div className='leading-3 text-sm text-gray-600 mt-1'>
                            {data?.instructor_fullname}
                          </div>
                          <div className='text-md mt-2'>
                            {data?.members_count} học viên đăng ký
                          </div>
                          <div className='text-md mb-1'>
                            {data?.rate_number > 0
                              ? `Xếp hạng ${data?.rate} sao trên tổng số ${data?.rate_number} đánh giá`
                              : "Chưa có đánh giá"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
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
              </div>
            ) : (
              <div className='min-h-[430px] z-0'>
                <EmptyData />
              </div>
            )}
          </div>
        )}
      </div>
      <div className='z-0'>
        <Footer />
      </div>
    </div>
  );
}

export default Search;
