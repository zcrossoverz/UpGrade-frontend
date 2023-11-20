import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import CourseItem from "./CourseItem";
import CreateCourseModal from "./courses/CreateCourseModal";
import { useGetListCourses } from "@/hooks/useCourse";
import Loader from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";

function CourseManagement() {
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  const authHook = useAuth();

  const { user_id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const [paginationProps, setPagination] = useState({
    currentPage: Number(searchParams.get("page") || 1),
    totalCount: 0,
    pageSize: Number(searchParams.get("pageSize") || 5),
    siblingCount: 1,
  });

  const { data, isLoading, remove, refetch } = useGetListCourses(
    {
      ...(authHook?.isAdmin
        ? {}
        : {
            explicit: [
              {
                key: "instructor_id",
                value: user_id,
              },
            ],
          }),

      page: paginationProps.currentPage,
      limit: paginationProps.pageSize,
      order: {
        key: "id",
        value:
          searchParams.get("order") !== null
            ? searchParams.get("order")
            : "DESC",
      },
      ...(searchParams.get("search") !== null
        ? {
            query: [
              {
                key: "title",
                value: searchParams.get("search"),
              },
            ],
          }
        : {}),
    },
    "course_management"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!authHook.isLoading && authHook?.isAdmin === false && !user_id) {
      navigate("/");
      remove();
    }
  }, [authHook]);

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
  ]);

  return (
    <div>
      <div className='px-4 py-4 bg-white shadow-sm rounded-sm min-h-[500px]'>
        <CreateCourseModal
          isPopupOpen={showCreateCourseModal}
          handleClose={() => setShowCreateCourseModal(false)}
        />
        <div className='flex justify-between items-center mt-4'>
          <div className='flex'>
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
          </div>
          <div>
            <button
              className='bg-violet-600/80 text-white py-[8px] px-3'
              onClick={() => setShowCreateCourseModal(true)}
            >
              Khóa học mới
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className='relative flex justify-center items-center min-h-[200px] mt-8'>
            <Loader />
          </div>
        ) : (
          <>
            {data?.count > 0 ? (
              <div>
                <div className='mt-8 min-h-[450px]'>
                  {data &&
                    data.datas.map(
                      (
                        data: {
                          thumbnail_url: string;
                          description: string;
                          title: string;
                          updated_at: string;
                          id: number;
                          status: string;
                          members_count: number;
                        },
                        i: number
                      ) => <CourseItem key={i.toString()} data={data} />
                    )}
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
                      return newParams;
                    });
                    setPagination((prev) => ({
                      ...prev,
                      pageSize,
                    }));
                  }}
                />
              </div>
            ) : (
              <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
                <p className='text-gray-600'>Chưa có nội dung nào</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CourseManagement;
