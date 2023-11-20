/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import { useDeleteTopic, useGetListTopics } from "@/hooks/useCourse";
import { formatTime } from "@/utils/time";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import ModalDelete from "@/components/ModalDelete";
import { secondsToTime } from "@/utils/convertNumber";
import CreateTopicModal from "./topics/CreateTopicModal";
import UpdateTopicModal from "./topics/UpdateTopicModal";
import Badge from "@/components/Badge";

function TopicManagement() {
  const { unit_id, course_id } = useParams();
  const { isLoading, data } = useGetListTopics(Number(unit_id));

  const [openCreateTopic, setOpenCreateTopic] = useState(false);
  const [updateTopicModal, setUpdateTopicModal] = useState({
    isOpen: false,
    topic: {},
  });
  const [deleteTopicModal, setDeleteTopicModal] = useState({
    isOpen: false,
    topic_id: -1,
    title: "",
  });

  const selectUpdateTopic = (data: {
    title: string;
    description: string;
    unit_id: number;
  }) => {
    setUpdateTopicModal({
      isOpen: true,
      topic: { ...data },
    });
  };

  const selectDeleteTopic = (data: { title: string; topic_id: number }) => {
    setDeleteTopicModal({
      isOpen: true,
      title: `Xóa ${data.title}`,
      topic_id: data.topic_id,
    });
  };

  const deleteTopicHook = useDeleteTopic(Number(unit_id));
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='-mt-4'>Quản lý nội dung chương</h1>
      {openCreateTopic && (
        <CreateTopicModal
          drive_folder_unit_id={data?.drive_folder_unit_id}
          index={data?.count}
          handleClose={() => setOpenCreateTopic(false)}
          unit_id={Number(unit_id)}
        />
      )}
      {updateTopicModal.isOpen && (
        <UpdateTopicModal
          data={updateTopicModal.topic}
          handleClose={() =>
            setUpdateTopicModal({
              isOpen: false,
              topic: {},
            })
          }
          unit_id={Number(unit_id)}
        />
      )}
      {deleteTopicModal.isOpen && (
        <ModalDelete
          isLoading={deleteTopicHook.isLoading}
          handleClose={() => {
            setDeleteTopicModal({
              topic_id: -1,
              isOpen: false,
              title: "",
            });
          }}
          handleSubmit={async () => {
            await deleteTopicHook.mutateAsync(deleteTopicModal.topic_id);
            setDeleteTopicModal({
              topic_id: -1,
              isOpen: false,
              title: "",
            });
          }}
          title={deleteTopicModal.title}
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
              onClick={() => setOpenCreateTopic(true)}
            >
              Thêm bài học mới
            </button>
          </div>
        </div>
        <div className='mt-8 min-h-[350px]'>
          <hr className='-mt-6' />
          {isLoading ? (
            <div className='flex justify-center items-center min-h-[200px] mt-4 w-full'>
              <Loader />
            </div>
          ) : data?.datas?.length > 0 ? (
            <div className='flex justify-center mt-6 w-full'>
              <Table
                handleEdit={selectUpdateTopic}
                handleDelete={selectDeleteTopic}
                handleView={({ topic_id }: { topic_id: number }) => {
                  navigate(`/learning/${Number(course_id)}/${topic_id}`);
                }}
                data={data.datas.map(
                  (
                    e: {
                      title: string;
                      updated_at: string;
                      created_at: string;
                      id: number;
                      description: string;
                      duration: number;
                      status: string;
                    },
                    i: number
                  ) => ({
                    order: (i + 1).toString(),
                    title: e.title,
                    updateDate: formatTime(e.updated_at),
                    createDate: formatTime(e.created_at),
                    description: e.description,
                    topic_id: e.id,
                    status:
                      e.status === "public" ? (
                        <Badge
                          text='Công khai'
                          color='text-green-600'
                          bgColor='bg-green-200'
                        />
                      ) : (
                        <Badge
                          text='Riêng tư'
                          color='text-red-600'
                          bgColor='bg-red-200'
                        />
                      ),
                    duration: secondsToTime(e.duration),
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
                    key: "description",
                    title: "Mô tả",
                  },
                  {
                    key: "duration",
                    title: "Thời lượng",
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
      </div>
    </div>
  );
}

export default TopicManagement;
