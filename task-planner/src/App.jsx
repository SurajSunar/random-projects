import React, { useEffect, useState } from "react";
import "animate.css";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Tag,
} from "antd";
import { Plus } from "lucide-react";

const App = () => {
  const [open, setOpen] = useState();
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());

  const createTask = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <nav className="bg-white h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8">
        <button className="rounded-full w-12 h-12 bg-blue-600 border-2 border-blue-200 text-white">
          PL
        </button>
        <div className="flex gap-2">
          <DatePicker placeholder="Select Date" format={"DD MMM YYYY"} />
          <h1 className="text-xl font-bold">{timer}</h1>
        </div>
      </nav>

      <section className="p-4 fixed top-[60px] left-0 h-[calc(100%-120px)] overflow-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="h-[400px] lg:h-full lg:min-h-0">
          <Badge.Ribbon
            text="Highest"
            className="!bg-blue-600 z-10"
          ></Badge.Ribbon>
          <div className="bg-white rounded-lg h-full overflow-auto p-4">
            <button
              className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
              onClick={() => setOpen(true)}
            >
              <Plus />
              Add Task
            </button>
            <div className="mt-4 flex flex-col gap-8">
              {Array(10)
                .fill(0)
                .map((index) => (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title="You tube downloader"
                      description={`${
                        index + 1
                      } Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Corporis, culpa voluptate?`}
                    ></Card.Meta>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag>Pending</Tag>
                        <Tag>Delete</Tag>
                      </div>
                      <Select size="small" placeholder="Change Status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inprogress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
        <div className=" h-[400px] lg:h-full lg:min-h-0">
          <Badge.Ribbon
            text="Medium"
            className="!bg-orange-600 z-10"
          ></Badge.Ribbon>
          <div className="bg-white rounded-lg h-full overflow-auto p-4">
            <button
              className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
              onClick={() => setOpen(true)}
            >
              <Plus />
              Add Task
            </button>
            <div className="mt-4 flex flex-col gap-8">
              {Array(10)
                .fill(0)
                .map((index) => (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title="You tube downloader"
                      description={`${
                        index + 1
                      } Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Corporis, culpa voluptate?`}
                    ></Card.Meta>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag>Pending</Tag>
                        <Tag>Delete</Tag>
                      </div>
                      <Select size="small" placeholder="Change Status">
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="inprogress">
                          In Progress
                        </Select.Option>
                        <Select.Option value="completed">
                          Completed
                        </Select.Option>
                      </Select>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
        <div className=" h-[400px] lg:h-full lg:min-h-0">
          <Badge.Ribbon
            text="Lowest"
            className="!bg-amber-600 z-10"
          ></Badge.Ribbon>
          <div className="h-full min-h-0">
            <div className="bg-white rounded-lg h-full overflow-auto p-4">
              <button
                className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Add Task
              </button>
              <div className="mt-4 flex flex-col gap-8">
                {Array(10)
                  .fill(0)
                  .map((index) => (
                    <Card hoverable key={index}>
                      <Card.Meta
                        title="You tube downloader"
                        description={`${
                          index + 1
                        } Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Corporis, culpa voluptate?`}
                      ></Card.Meta>

                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <Tag>Pending</Tag>
                          <Tag>Delete</Tag>
                        </div>
                        <Select size="small" placeholder="Change Status">
                          <Select.Option value="pending">Pending</Select.Option>
                          <Select.Option value="inprogress">
                            In Progress
                          </Select.Option>
                          <Select.Option value="completed">
                            Completed
                          </Select.Option>
                        </Select>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white h-[60px] fixed bottom-0 left-0 w-full  flex justify-between items-center px-8">
        <h1 className="text-xl font-bold">Total Task: 1</h1>
        <p className="text-gray-400">Developed for Learning</p>
      </footer>
      <Modal
        open={open}
        footer={null}
        title="Add New Task"
        onCancel={handleClose}
        maskClosable={false}
      >
        <Form onFinish={createTask}>
          <Form.Item name="Title" rules={[{ required: true }]}>
            <Input name="Task Name" size="large" />
          </Form.Item>

          <Form.Item name="Description" rules={[{ required: true }]}>
            <Input.TextArea name="Task Description" rows={5} />
          </Form.Item>

          <Form.Item name="Priority" rules={[{ required: true }]}>
            <Select size="large" placeholder="Select priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
