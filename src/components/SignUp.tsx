import React from "react";
import { Form, Input, Button } from "antd";
import api from "../utils/api";
import { useHistory } from "react-router-dom";
import showError from "../utils/showError";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };

function SignUp() {
  const { t } = useTranslation();
  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values);
      history.push("/login", { newSignUp: true });
    } catch (error) {
      console.log({ error });
      showError((error as any).response.data.errorMessage);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", delay: 0.3 }}
    >
      <Form
        {...layout}
        name='nest-messages'
        onFinish={onFinish}
        // validateMessages={validateMessages}
      >
        <Form.Item
          name='username'
          label={t("username")}
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='email'
          label={t("email")}
          rules={[{ type: "email", required: true }]}
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
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            {t("submit")}
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
}

export default SignUp;
