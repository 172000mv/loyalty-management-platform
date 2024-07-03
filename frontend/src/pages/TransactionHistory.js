import React from "react";
import { Table } from "antd";
import "./TransactionHistory.css";

const columns = [
  {
    title: "Transaction ID",
    dataIndex: "transaction_id",
    key: "transaction_id",
  },
  {
    title: "User ID",
    dataIndex: "user_id",
    key: "user_id",
  },
  {
    title: "Type",
    dataIndex: "transaction_type",
    key: "transaction_type",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const data = [
  {
    key: "1",
    transaction_id: "12345",
    user_id: "u001",
    transaction_type: "Credit",
    amount: "100",
    date: "2024-06-24",
  },
  // Add more data here
];

const TransactionHistory = () => {
  return (
    <div className="transaction-history-container">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default TransactionHistory;
