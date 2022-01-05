import { Form, Input, Button, Checkbox, Result } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../types/user";
import { AppState } from "../store";
import { useEffect } from "react";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();

  const { data, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess(`${t("loginSuccess")}`);
  }, [data.username, t]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", delay: 0.3 }}
    >
      <Form
        name='basic'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
      >
        {location.state?.newSignUp && (
          <Result
            status='success'
            title={t("registerSuccess")}
            subTitle={t("registerSuccessText")}
          />
        )}
        <Form.Item
          label={t("username")}
          name='username'
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t("password")}
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
          <Checkbox>{t("remember")}</Checkbox>
          <Button onClick={() => history.push("/register")}>
            {t("NoAccount")}
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default Login;
