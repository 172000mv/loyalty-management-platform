import React from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import "./TransactionForm.css";

const { Option } = Select; // Add this line to import Option

const TransactionForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="transaction-form-container">
      <Form
        form={form}
        name="transaction_form"
        className="transaction-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="user_id"
          rules={[{ required: true, message: "Please input User ID!" }]}
        >
          <Input placeholder="User ID" />
        </Form.Item>
        <Form.Item
          name="transaction_type"
          rules={[{ required: true, message: "Please select Transaction Type!" }]}
        >
          <Select placeholder="Transaction Type">
            <Option value="manage_members">Manage Members</Option>
            <Option value="points_operation">Points Operation</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="operation"
          dependencies={["transaction_type"]}
          rules={[{ required: true, message: "Please select an Operation!" }]}
        >
          <Select placeholder="Select Operation">
            {form.getFieldValue("transaction_type") === "manage_members" && (
              <>
                <Option value="add_member">Add Member</Option>
                <Option value="remove_member">Remove Member</Option>
              </>
            )}
            {form.getFieldValue("transaction_type") === "points_operation" && (
              <>
                <Option value="update_points">Update Points</Option>
                <Option value="redeem_points">Redeem Points</Option>
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Please input Amount!" }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please select Date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="transaction-form-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TransactionForm;
