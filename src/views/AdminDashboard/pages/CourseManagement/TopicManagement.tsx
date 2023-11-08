/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import { useDeleteUnit, useGetCourse } from "@/hooks/useCourse";
import { formatTime } from "@/utils/time";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useParams } from "react-router-dom";
import CreateUnitModal from "./units/CreateUnitModal";
import UpdateUnitModal from "./units/UpdateUnitModal";
import ModalDelete from "@/components/ModalDelete";

function TopicManagement() {
  const { course_id } = useParams();
  const { isLoading, data } = useGetCourse(Number(course_id));

  const [openCreateUnit, setOpenCreateUnit] = useState(false);
  const [updateUnitModal, setUpdateUnitModal] = useState({
    isOpen: false,
    unit: {},
  });
  const [deleteUnitModal, setDeleteUnitModal] = useState({
    isOpen: false,
    unit_id: -1,
    title: "",
  });

  const selectUpdateUnit = (data: { title: string; description: string }) => {
    setUpdateUnitModal({
      isOpen: true,
      unit: { ...data },
    });
  };

  const selectDeleteUnit = (data: { title: string; unit_id: number }) => {
    setDeleteUnitModal({
      isOpen: true,
      title: `Xóa ${data.title}`,
      unit_id: data.unit_id,
    });
  };

  const deleteUnitHook = useDeleteUnit(Number(course_id));

  return (
    <div>
      <h1 className='-mt-4'>Quản lý nội dung chương</h1>
      {openCreateUnit && (
        <CreateUnitModal
          index={data?.units.length}
          handleClose={() => setOpenCreateUnit(false)}
          course_id={Number(course_id)}
        />
      )}
      {updateUnitModal.isOpen && (
        <UpdateUnitModal
          data={updateUnitModal.unit}
          handleClose={() =>
            setUpdateUnitModal({
              isOpen: false,
              unit: {},
            })
          }
          course_id={Number(course_id)}
        />
      )}
      {deleteUnitModal.isOpen && (
        <ModalDelete
          isLoading={deleteUnitHook.isLoading}
          handleClose={() => {
            setDeleteUnitModal({
              unit_id: -1,
              isOpen: false,
              title: "",
            });
          }}
          handleSubmit={async () => {
            await deleteUnitHook.mutateAsync(deleteUnitModal.unit_id);
            setDeleteUnitModal({
              unit_id: -1,
              isOpen: false,
              title: "",
            });
          }}
          title={deleteUnitModal.title}
        />
      )}
      <div className='bg-white px-4 py-8 mt-4 shadow-md rounded-sm'>
        <div className='flex justify-between items-center'>
          <div className='flex'>
            <div className='border flex'>
              <input
                type='text'
                className='py-[8px] px-4 outline-0'
                placeholder='Tìm kiếm bài học'
              />
              <button className='px-3 bg-gray-600 text-white h-[40px] text-md'>
                <BsSearch />
              </button>
            </div>
            <div className='ml-4 flex'>
              <select className='border px-2 py-1 text-sm pr-8'>
                <option value='ASC'>Mới nhất</option>
                <option value='DESC'>Cũ nhất</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className='bg-violet-600/80 text-white py-[8px] px-3'
              onClick={() => setOpenCreateUnit(true)}
            >
              Thêm chương mới
            </button>
          </div>
        </div>
        <div className='mt-8 min-h-[350px]'>
          <hr className='-mt-6' />
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
              <Loader />
            </div>
          ) : data.units.length > 0 ? (
            <div className='flex justify-center mt-6 w-full'>
              <Table
                handleEdit={selectUpdateUnit}
                handleDelete={selectDeleteUnit}
                data={data.units.map(
                  (
                    e: {
                      title: string;
                      updated_at: string;
                      created_at: string;
                      topics: any[];
                      id: number;
                    },
                    i: number
                  ) => ({
                    order: (i + 1).toString(),
                    title: e.title,
                    updateDate: formatTime(e.updated_at),
                    createDate: formatTime(e.created_at),
                    numberTopics: e.topics.length,
                    unit_id: e.id,
                  })
                )}
                headerLabel={[
                  {
                    key: "order",
                    title: "#",
                  },
                  {
                    key: "title",
                    title: "Tiêu đề",
                  },
                  {
                    key: "numberTopics",
                    title: "Số chủ đề",
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
      </div>
    </div>
  );
}

export default TopicManagement;
