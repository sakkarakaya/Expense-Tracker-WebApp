import React from "react";
import { Form, Input, Button, Checkbox, Result } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../store/actions/userAction";
import api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../types/user";
import { AppState } from "../store";
import { useEffect } from "react";

const Login = () => {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [data]);

  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      {location.state?.newSignUp && (
        <Result
          status='success'
          title='Successfully registered!'
          subTitle='You can login now'
        />
      )}
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
