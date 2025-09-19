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
import Task from "./task/Task";
import Timer from "./timer";
import TaskList from "./task/Task-List";
import CreateTask from "./task/Create-Task";
import Header from "./layout/header";
import Footer from "./layout/footer";


const App = () => {
  const [open, setOpen] = useState();
  const [task, setTask] = useState();
 
  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <Header setOpen={setOpen} />
      <TaskList setOpen={setOpen} setTask={setTask}></TaskList>
      <Footer />
      <CreateTask open={open} setOpen={setOpen} task={task}></CreateTask>
    </div>
  );
};

export default App;
