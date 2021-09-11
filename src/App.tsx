import React from "react";
import { Route } from "react-router";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Categories from "./components/Categories";
import PrivateRoute from "./components/PrivateRoute";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={["2"]}>
          <Menu.Item key='1'>nav 1</Menu.Item>
          <Menu.Item key='2'>nav 2</Menu.Item>
          <Menu.Item key='3'>nav 3</Menu.Item>
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
