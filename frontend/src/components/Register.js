import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import logo from "../comviva_logo.png";
import logoText from "../comviva_logo_text.png";

const Register = () => {
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values
      );
      if (response.status === 200) {
        message.success("Registration successful!");
        // Redirect or perform other actions after successful registration
      } else {
        message.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <img src={logoText} alt="Comviva Logo Text" className="logo-text" />
      </div>
      <div className="register-form">
        <h1>Register</h1>
        <Form
          name="register"
          className="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            Already have an account? <Link to="/login">Login now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
