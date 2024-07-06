// TransactionForm.js
import React from 'react';
import { Form, Button } from 'antd';

const TransactionForm = () => {
  // Component logic
  return (
    <Form>
      {/* Form items */}
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default TransactionForm;
