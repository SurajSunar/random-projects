import React from "react";
import { usePlanner } from "../store/usePlanner";
import { Badge, Empty } from "antd";
import Task from "./Task";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import CreateTask from "./Create-Task";
const COLUMNS = ["highest", "medium", "lowest"];

const BADGE_COLORS = {
  highest: "!bg-blue-500",
  medium: "!bg-orange-500",
  lowest: "!bg-cyan-500",
};

function TaskList({ open, setOpen }) {
  const { filterTasks, updateTask, deleteTask } = usePlanner();

  let list = COLUMNS.reduce((acc, key) => {
    return {
      ...acc,
      [key]: (filterTasks() || []).filter((task) => task.priority === key),
    };
  }, {});

  const editStatus = (id, status) => {
    updateTask({ id, status });
    toast('Task status updated successfully')
  };

  const editTask = (task) => {
      setOpen({value: true, task})
  };


  const confirmDelete = (id) => {
    deleteTask({ id });
    toast('Status deleted successfully')
  };

  return (
    <>
      <section className="p-4 fixed top-[60px] left-0 h-[calc(100%-120px)] overflow-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {COLUMNS.map((key) => (
          <div key={key} className="h-[400px] lg:h-full lg:min-h-0">
            <Badge.Ribbon
              text={key}
              className={`${BADGE_COLORS[key]} z-10 capitalize`}
            ></Badge.Ribbon>
            <div className="bg-white rounded-lg h-full overflow-auto p-4">
              <div className="mt-4 flex flex-col gap-8 h-full">
                {list[key].length ? (
                  list[key].map((task, index) => (
                    <Task
                      key={index}
                      task={task}
                      confirmDelete={confirmDelete}
                      editTask={editTask}
                      editStatus={editStatus}
                    />
                  ))
                ) : (
                  <div className="flex flex-col justify-center items-center h-full gap-4">
                    <Empty description={`No ${key} task in the list`}></Empty>
                    <button
                      className="cursor-pointer px-2 py-1 rounded flex gap-1 bg-blue-500 text-white"
                      onClick={() => setOpen({value: false})}
                    >
                      <Plus />
                      Add Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <CreateTask open={open} setOpen={setOpen}></CreateTask>
    </>
  );
}

export default TaskList;
