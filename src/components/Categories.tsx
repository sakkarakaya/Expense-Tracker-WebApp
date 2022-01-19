import {
  Table,
  Tag,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Space,
  Popconfirm,
} from "antd";
import { Category, CategoryForm } from "../types/category";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../store/actions/categoryAction";
import { AppState } from "../store";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Categories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  console.log("category", { data, loading, error });

  const emptyForm: CategoryForm = {
    name: "",
    type: "expense",
    color: "red",
  };

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    mode: "add",
  });
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: string) => {
    setIsModalVisible({ show: true, mode: mode });
  };
  const handleOk = () => {
    isModalVisible.mode === "add"
      ? dispatch(addCategory(form))
      : dispatch(editCategory(form, editId as number));
    setIsModalVisible({ show: false, mode: "" });
    setForm(emptyForm);
    setEditId(null);
  };
  const handleCancel = () => {
    setIsModalVisible({ show: false, mode: "" });
    setForm(emptyForm);
    setEditId(null);
  };
  const popConfirm = () => {
    dispatch(deleteCategory(deleteId as number));
  };

  const columns = [
    {
      title: `${t("name")}`,
      dataIndex: "name",
      key: "name",
    },
    {
      title: `${t("type")}`,
      dataIndex: "type",
      key: "id",
      render: (text: string, category: Category) => {
        return (
          <Tag key={category.id} color={category.color}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: `${t("action")}`,
      dataIndex: "id",
      key: "actions",
      render: (text: string, category: Category) => (
        <Space size='middle'>
          <Button
            type='primary'
            onClick={() => {
              showModal("edit");
              setForm(category);
              setEditId(category.id);
            }}
          >
            {t("edit")}
          </Button>

          <Popconfirm
            title='Are you sure to delete?'
            onConfirm={() => {
              popConfirm();
            }}
          >
            <a
              href='!#'
              style={{ color: "red" }}
              onClick={() => setDeleteId(category.id)}
            >
              {t("delete")}
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ type: "spring", delay: 0.3 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Button type='primary' onClick={() => showModal("add")}>
          {t("addCategory")}
        </Button>
      </div>
      <Modal
        title={
          isModalVisible.mode === "add"
            ? `${t("newCategory")}`
            : `${t("editCategory")}`
        }
        visible={isModalVisible.show}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={t("cancel")}
        okButtonProps={{ disabled: !form.name }}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item label={t("name")}>
            <Input
              name='name'
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={t("type")}>
            <Select
              defaultValue='expense'
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e })}
            >
              <Select.Option value='income'>{t("income")}</Select.Option>
              <Select.Option value='expense'>{t("expense")}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label={t("color")}>
            <Select
              defaultValue='red'
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e })}
            >
              <Select.Option value='red'>{t("red")}</Select.Option>
              <Select.Option value='blue'>{t("blue")}</Select.Option>
              <Select.Option value='green'>{t("green")}</Select.Option>
              <Select.Option value='yellow'>{t("yellow")}</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey='id'
      />
    </motion.div>
  );
};

export default Categories;
