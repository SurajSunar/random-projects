import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { usePlanner } from "../store/usePlanner";
import { toast } from "react-toastify";

function CreateTask({ open, setOpen }) {
  const [form] = Form.useForm();
  const { addTask, updateTask } = usePlanner();

  open?.task && form.setFieldsValue(open?.task)

  const manageTask = (value) => {
    open.task ? updateTask({...value, id: open.task.id}) : addTask({ ...value, id: uuidv4() });
    handleClose();
    toast(open.task.id ? 'Task updated successfully' : 'Task created successfully')
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

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
