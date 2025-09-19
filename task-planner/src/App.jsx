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
import { ToastContainer } from "react-toastify";

const App = () => {
  const [open, setOpen] = useState();
 
  return (
    <div className="bg-gray-200 h-screen overflow-hidden">
      <Header setOpen={setOpen} />
      <TaskList open={open} setOpen={setOpen} />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
