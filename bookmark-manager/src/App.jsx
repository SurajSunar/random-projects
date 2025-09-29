import { Modal, Form, Input, Button, Popconfirm } from "antd";
import {
  ExternalLink,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useBookmark } from "./zustand/useBookmark";
import dayjs from "dayjs";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { bookmarks, setBookmark, removeBookmark } = useBookmark();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const submitForm = async (values) => {
    setBookmark(values);
    onClose();
  };

  const deleteBookmark = (id) => {
    removeBookmark(id);
  };

  return (
    <div className="bg-gray-200 min-h-screen py-5">
      <div className="flex justify-center my-10">
        <h1 className="text-4xl font-bold underline">Bookmark Manager</h1>
      </div>
      <div className="w-10/12 mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          className="bg-white shadow-2xl rounded-lg flex flex-col justify-center items-center p-10 hover:scale-105 duration-200"
          onClick={() => showModal()}
        >
          <div className="mb-4 w-16 h-16 bg-gradient-to-r from-rose-500 via-orange-400 to-rose-300 rounded-4xl flex justify-center items-center text-white">
            <Plus className="w-12 h-12" />
          </div>
          <h1 className="text-lg">Add Bookmark</h1>
        </div>

        {bookmarks.map((bookmark) => (
          <div className="group bg-white shadow-2xl rounded-lg flex flex-col justify-evenly items-center hover:scale-105 duration-200">
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => deleteBookmark(bookmark.id)}
              okText="Yes"
              cancelText="No"
            >
              <Trash2 className="w-6 opacity-0 self-end mr-4 text-red-500 cursor-pointer group-hover:opacity-100" />
            </Popconfirm>
            <p className="text-xl flex flex-col items-center">
              <span>{bookmark.name}</span>
              <span className="text-xs text-gray-400">
                {dayjs(bookmark.id).format("DD-MMM-YYYY")}
              </span>
            </p>

              <a
                href={bookmark.url}
                className="text-sm text-gray-400 flex items-center gap-2 hover:underline hover:text-gray-800"
                target="_blank">
                Visit
                <ExternalLink className="w-4 h-10" />
              </a>
          </div>
        ))}
      </div>
      <Modal
        title="Add Bookmark"
        open={isModalOpen}
        maskClosable={true}
        onCancel={() => onClose()}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={submitForm}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Weblink"
            name="url"
            rules={[{ required: true, message: "Please input your weblink!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
