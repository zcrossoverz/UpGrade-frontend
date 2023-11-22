/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { useAuth } from "@/hooks/useAuth";
import { useGetListUser, useUpdateUser } from "@/hooks/useUser";
import { formatTime } from "@/utils/time";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router-dom";

function UserManagement() {
  const navigate = useNavigate();

  // pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const authHook = useAuth();
  const useUserUpdate = useUpdateUser(true);
  const [paginationProps, setPagination] = useState({
    currentPage: Number(searchParams.get("page") || 1),
    totalCount: 0,
    pageSize: Number(searchParams.get("pageSize") || 5),
    siblingCount: 1,
  });

  const { data, isLoading, refetch } = useGetListUser({
    page: paginationProps.currentPage,
    limit: paginationProps.pageSize,
    ...(searchParams.get("search") !== null
      ? {
          query: [
            {
              key: "email",
              value: searchParams.get("search"),
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
  ]);

  // end pagination

  return (
    <div className='mt-2 min-h-[350px]'>
      <h1 className='-mt-4'>Quản lý tài khoản</h1>
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
                placeholder='Tìm kiếm thành viên bằng email'
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
            {/* <div className='ml-4 flex'>
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
            </div> */}
          </div>
          <>
            {data?.count > 0 ? (
              <>
                <div className='flex justify-center mt-4 w-full'>
                  <Table
                    handleForward={() => {
                      navigate(`/settings`);
                    }}
                    handleCancel={async (data: any) => {
                      await useUserUpdate.mutateAsync({
                        id: data.id,
                        isActive: false,
                      });
                    }}
                    handleTick={async (data: any) => {
                      await useUserUpdate.mutateAsync({
                        id: data.id,
                        isActive: true,
                      });
                    }}
                    data={data?.datas?.map((e: any, i: number) => ({
                      order: (i + 1).toString(),
                      fullname: e.firstName + " " + e.lastName,
                      email: e.email,
                      role:
                        (e.role === "user" && (
                          <Badge
                            text='Thành viên'
                            color='text-yellow-700'
                            bgColor='bg-yellow-200'
                          />
                        )) ||
                        (e.role === "admin" && (
                          <Badge
                            text='Quản trị viên'
                            color='text-pink-700'
                            bgColor='bg-pink-200'
                          />
                        )),

                      updateDate: formatTime(e.updated_at),
                      createDate: formatTime(e.created_at),
                      isActive:
                        (e.isActive === true && (
                          <Badge
                            text='Đang hoạt động'
                            color='text-green-700'
                            bgColor='bg-green-200'
                          />
                        )) ||
                        (e.isActive === false && (
                          <Badge
                            text='Bị khóa'
                            color='text-red-700'
                            bgColor='bg-red-200'
                          />
                        )),
                      id: e.id,
                      hiddenForward: authHook?.data?.id !== e.id,
                      hiddenCancel:
                        authHook?.data?.id === e.id || e.isActive === false,
                      hiddenTick:
                        authHook?.data?.id === e.id || e.isActive === true,
                    }))}
                    headerLabel={[
                      {
                        key: "order",
                        title: "#",
                      },
                      {
                        key: "fullname",
                        title: "Họ tên",
                      },
                      {
                        key: "email",
                        title: "Email",
                      },
                      {
                        key: "role",
                        title: "Vai trò",
                      },
                      {
                        key: "isActive",
                        title: "Trạng thái",
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

export default UserManagement;
