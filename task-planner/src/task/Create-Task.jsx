import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { usePlanner } from "../store/usePlanner";

function CreateTask({ open, setOpen, task }) {
  const [form] = Form.useForm();
  const { addTask, updateTask } = usePlanner();

  task && form.setFieldsValue(task)

  const manageTask = (value) => {
    task.id ? updateTask({...value, id: task.id}) : addTask({ ...value, id: uuidv4() });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };``

  return (
    <Modal
      open={open}
      footer={null}
      title="Add New Task"
      onCancel={handleClose}
      maskClosable={false}
    >
      <Form onFinish={manageTask} form={form}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input size="middle" placeholder="Task Name" />
        </Form.Item>

        <Form.Item name="description" rules={[{ required: true }]}>
          <Input.TextArea
            size="middle"
            rows={5}
            placeholder="Task Description"
          />
        </Form.Item>

        <Form.Item name="priority" rules={[{ required: true }]}>
          <Select size="middle" placeholder="Select priority">
            <Select.Option value="highest">Highest</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="lowest">Lowest</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" size="large" className="cursor-pointer">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateTask;
