import { Card, Popconfirm, Select, Tag } from "antd";
import { Pencil } from "lucide-react";
import React from "react";

const STATUS_COLORS = {
  pending: "!border-red-500 !text-red-500 ",
  inprogress: "!border-blue-500 !text-blue-500 ",
  completed: "!border-green-500 !text-green-500",
};

function Task({ task, confirmDelete, editStatus, editTask }) {
  return (
    <>
      <Card hoverable>
        <Pencil size={'14'} className="absolute right-4" onClick={()=> editTask(task)} />
        <Card.Meta
          title={task.title}
          description={task.description}
        ></Card.Meta>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <Tag className={`capitalize border ${STATUS_COLORS[task.status || 'pending']}`}>{task.status || 'pending'}</Tag>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => confirmDelete(task.id)}
              okText="Yes"
              cancelText="No"
            >
              <Tag className="!bg-red-500 !text-white">Delete</Tag>
            </Popconfirm>
          </div>
          <Select
            size="small"
            placeholder="Change Status"
            value={task.status}
            onChange={(value) => editStatus(task.id, value)}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="inprogress">In Progress</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
          </Select>
        </div>
      </Card>
    </>
  );
}

export default Task;
