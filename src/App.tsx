import React, { useState } from "react";
import { Route, useHistory, useLocation, Switch } from "react-router";
import Todos from "./components/todo/Todos";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Categories from "./components/Categories";
import Records from "./components/Records";
import Logout from "./components/Logout";
import PrivateRoute from "./components/PrivateRoute";
import { Button, Layout, Menu, Select } from "antd";
import { Link } from "react-router-dom";
import NewTodo from "./components/todo/NewTodo";

import FoodHeader from "./components/food/Layout/Header";
import Cart from "./components/food/Cart/Cart";
import Meals from "./components/food/Meals/Meals";

import TodoContextProvide from "./store/TodoContextProvide";
import CartProvider from "./store/CartProvider";
import { useSelector } from "react-redux";
import { AppState } from "./store";

import { AnimatePresence, motion } from "framer-motion";

import { useTranslation } from "react-i18next";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const lngs: any = {
  en: "English",
  de: "Deutsch",
  tr: "Türkçe",
};

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const { data, loading, error } = useSelector((state: AppState) => state.user);
  console.log("user", { data, loading, error });

  const [isShown, setIsShown] = useState(false);
  const showHandle = () => {
    setIsShown(true);
  };
  const hideHandle = () => {
    setIsShown(false);
  };
  function handleChange(value: string | undefined) {
    i18n.changeLanguage(value);
  }

  return (
    <TodoContextProvide>
      <CartProvider>
        <Layout>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
            }}
          >
            <Menu
              theme='dark'
              mode='horizontal'
              selectedKeys={[location.pathname]}
              defaultSelectedKeys={["/"]}
            >
              <Menu.Item key='/'>
                <Link to='/'></Link>
                {t("home")}
              </Menu.Item>
              {/* <Menu.Item key='/todo'>
                <Link to='/todo'></Link>ToDo
              </Menu.Item>
              <Menu.Item key='/food'>
                <Link to='/food'></Link>OrderApp
              </Menu.Item> */}
              <Menu.Item key='/records'>
                <Link to='/records'></Link>
                {t("records")}
              </Menu.Item>
              <Menu.Item key='/categories'>
                <Link to='/categories'></Link>
                {t("categories")}
              </Menu.Item>

              {data?.username ? (
                <React.Fragment>
                  <Menu.Item key='/info'>{data.email}</Menu.Item>
                  <Menu.Item key='/logout'>
                    <Link to='/logout'></Link>
                    {t("logout")}
                  </Menu.Item>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Menu.Item key='/login'>
                    <Link to='/login'></Link>
                    {t("login")}
                  </Menu.Item>
                  <Menu.Item key='/register'>
                    <Link to='/register'></Link>
                    {t("register")}
                  </Menu.Item>
                </React.Fragment>
              )}
              <Menu.Item key='/lang' style={{ float: "right" }}>
                <Select
                  defaultValue={i18n.resolvedLanguage}
                  style={{ width: 100 }}
                  onChange={handleChange}
                >
                  {Object.keys(lngs).map((lng) => (
                    <Option
                      key={lng}
                      value={lng}
                      style={{
                        fontWeight:
                          i18n.resolvedLanguage === lng ? "bold" : "normal",
                      }}
                    >
                      {lngs[lng]}
                    </Option>
                  ))}
                </Select>
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            className='site-layout'
            style={{ padding: "20px", marginTop: 64 }}
          >
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <PrivateRoute
                  path='/todo'
                  component={() => (
                    <>
                      <NewTodo />
                      <Todos />
                    </>
                  )}
                />
                <Route
                  path='/food'
                  component={() => (
                    <>
                      <FoodHeader showHandle={showHandle} />
                      {isShown && <Cart hideHandle={hideHandle} />}
                      <Meals />
                    </>
                  )}
                />
                <Route path='/register' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route
                  path='/'
                  exact
                  component={() => (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 1 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {" "}
                      {data?.username ? (
                        <h2>
                          {t("welcome")} {data.username?.toUpperCase()}:)
                        </h2>
                      ) : (
                        <Button
                          type='primary'
                          onClick={() => history.push("/login")}
                        >
                          {t("loginTo")}
                        </Button>
                      )}
                    </motion.div>
                  )}
                />
                <PrivateRoute path='/categories' component={Categories} />
                <PrivateRoute path='/records' component={Records} />
              </Switch>
            </AnimatePresence>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()}
          </Footer>
          <div>
            {Object.keys(lngs).map((lng) => (
              <button
                key={lng}
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                type='submit'
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lngs[lng]}
              </button>
            ))}
          </div>
        </Layout>
      </CartProvider>
    </TodoContextProvide>
  );
}

export default App;
