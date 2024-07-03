import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, LineChartOutlined } from "@ant-design/icons";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Members"
              value={14}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Transaction Trends"
              value={1128}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <img
              src="path_to_your_image"
              alt="Illustration"
              className="dashboard-image"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
