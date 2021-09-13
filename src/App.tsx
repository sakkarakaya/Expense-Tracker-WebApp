import React from "react";
import { Route } from "react-router";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Categories from "./components/Categories";
import PrivateRoute from "./components/PrivateRoute";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["1"]}>
          <Menu.Item key='1'>
            <Link to='/'></Link>
            Home
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/login'></Link>Login
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/register'></Link>Register
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className='site-layout'
        style={{ padding: "50px", marginTop: 64 }}
      >
        <Route path='/register' component={SignUp} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/categories' component={Categories} />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Expense Tracker © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
}

export default App;
