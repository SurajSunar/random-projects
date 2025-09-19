import React, { useEffect, useState } from "react";
import "animate.css";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { Plus } from "lucide-react";
import '@ant-design/v5-patch-for-react-19';
import { usePlanner } from "./store/usePlanner";
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState();
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  const {tasks, addTask, updateTask, deleteTask } = usePlanner()

  const list = ['highest', 'medium', 'lowest'].reduce((acc, key) => {
    return {
      ...acc,
      [key]: tasks.filter(task => task.priority === key)
    }
  }, {})

  console.log(list)

  const createTask = (value) => {
      addTask({...value, id: uuidv4()})
      handleClose();
  };

   const editTask = (id, status) => {
      updateTask({id, status })
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const confirmDelete = (id) => {
    deleteTask({id})
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <nav className="bg-gradient-to-r from-orange-600 via-amber-300 to-blue-300 h-[60px] fixed top-0 left-0 w-full flex justify-between items-center px-8">
        <button className="rounded-full w-12 h-12 bg-blue-600 border-2 border-blue-200 text-white">
          PL
        </button>
        <div className="flex gap-2">
          <h1 className="text-xl font-bold hidden lg:block">{timer}</h1>
          <DatePicker placeholder="Select Date" format={"DD MMM YYYY"} />
          <button
                className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Add Task
              </button>
        </div>
      </nav>

      <section className="p-4 fixed top-[60px] left-0 h-[calc(100%-120px)] overflow-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="h-[400px] lg:h-full lg:min-h-0">
          <Badge.Ribbon
            text="Highest"
            className="!bg-blue-600 z-10"
          ></Badge.Ribbon>
          <div className="bg-white rounded-lg h-full overflow-auto p-4">
            <div className="mt-4 flex flex-col gap-8 h-full">
             {
                list['highest'].length ?   
                
                list['highest'].map((task, index) => (
                  <Card hoverable key={index}>
                    <Card.Meta
                      title={task.title}
                      description={task.description}
                    ></Card.Meta>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag>{task.priority}</Tag>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={()=>confirmDelete(task.id)}
                            okText="Yes"
                            cancelText="No">
                            <Tag className="!bg-red-500 !text-white">Delete</Tag>
                          </Popconfirm>
                      </div>
                      <Select size="small" placeholder="Change Status" value={task.status} onChange={(value)=> editTask(task.id, value)}>
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
                ))
              :
               <div className="flex flex-col justify-center items-center h-full gap-4">
                 <Empty description="No priority task in the list"></Empty>
                  <button
                className="px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
                onClick={() => setOpen(true)}
              >
                <Plus />
                Add Task
              </button>
               </div>
             } 
           
            </div>
          </div>
        </div>
        <div className=" h-[400px] lg:h-full lg:min-h-0">
          <Badge.Ribbon
            text="Medium"
            className="!bg-orange-600 z-10"
          ></Badge.Ribbon>
          <div className="bg-white rounded-lg h-full overflow-auto p-4">
            <div className="mt-4 flex flex-col gap-8">
              {list['medium'].map((task, index) => (
                  <Card hoverable key={index}>
                    <Card.Meta
                       title={task.title}
                      description={task.description}
                    ></Card.Meta>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <Tag>{task.priority}</Tag>
                        <Tag className="bg-red-500">Delete</Tag>
                      </div>
                      <Select size="small" placeholder="Change Status"  value={task.status} onChange={(value)=> editTask(task.id, value)}>
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
              <div className="mt-4 flex flex-col gap-8">
                  {list['lowest'].map((task, index) => (
                    <Card hoverable key={index}>
                      <Card.Meta
                         title={task.title}
                      description={task.description}
                      ></Card.Meta>
                      <div className="mt-4 flex justify-between items-center">
                        <div>
                          <Tag>{task.priority}</Tag>
                          <Tag>Delete</Tag>
                        </div>
                        <Select size="small" placeholder="Change Status"  value={task.status} onChange={(value)=> editTask(task.id, value)}>
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

      <footer className="bg-gradient-to-r from-blue-300 via-amber-300 to-orange-200 h-[60px] fixed bottom-0 left-0 w-full  flex justify-between items-center px-8">
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
        <Form onFinish={createTask} form={form}>
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input  size="middle" placeholder="Task Name"  />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea  size="middle" rows={5}  placeholder="Task Description" />
          </Form.Item>

          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select  size="middle" placeholder="Select priority">
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
