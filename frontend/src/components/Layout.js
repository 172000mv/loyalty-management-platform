import React from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import {
  DashboardOutlined,
  FormOutlined,
  HistoryOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./Layout.css";

const { Header, Sider, Content } = Layout;

const CustomLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" theme="light" collapsedWidth="0">
        <div className="logo_inside">
          <span className="mobilytix">MobiLytix</span>
          <span className="rewards">Rewards</span>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<FormOutlined />}
            onClick={() => navigate("/transaction-form")}
          >
            Transaction Form
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<HistoryOutlined />}
            onClick={() => navigate("/transaction-history")}
          >
            Transaction History
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <div className="header-content">
            <div className="header-right">
              <BellOutlined style={{ fontSize: "20px", marginRight: "20px" }} />
              <Avatar icon={<UserOutlined />} />
              <span className="username">aaa</span>
              <Button
                type="primary"
                onClick={logout}
                style={{ marginLeft: "20px" }}
              >
                Logout
              </Button>
            </div>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
