import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Tag,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addRecord,
  deleteRecord,
  editRecord,
  getRecords,
} from "../store/actions/recordAction";
import { Record, RecordForm } from "../types/record";
import { Category } from "../types/category";
import { getCategories } from "../store/actions/categoryAction";
import { motion } from "framer-motion";

const Records = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  console.log("records", { data, loading, error });
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );

  const emptyForm: RecordForm = {
    title: "",
    amount: 0,
    category_id: 0,
  };

  const [isModalVisible, setIsModalVisible] = useState({
    show: false,
    mode: "add",
  });

  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: string) => {
    setIsModalVisible({ show: true, mode: mode });
  };

  const handleOk = () => {
    isModalVisible.mode === "add"
      ? dispatch(addRecord(form))
      : dispatch(editRecord(form, editId as number));
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
    dispatch(deleteRecord(deleteId as number));
  };

  const invalidForm =
    !form.title || form.amount === 0 || form.category_id === 0;

  useEffect(() => {
    dispatch(getRecords());
    categories.length === 0 && dispatch(getCategories());
  }, [categories.length, dispatch]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: number) => <p>{text}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return (
          <Tag key={category.id} color={category.color}>
            {category.name.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size='middle'>
            <Button
              type='primary'
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setEditId(record.id);
              }}
            >
              Edit
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
                onClick={() => setDeleteId(record.id)}
              >
                Delete
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

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
          Add a new record
        </Button>
      </div>
      <Modal
        title={isModalVisible.mode === "add" ? "New Record" : "Edit Record"}
        visible={isModalVisible.show}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: invalidForm }}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
          <Form.Item label='Title'>
            <Input
              name='title'
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Form.Item>
          <Form.Item label='Amount'>
            <Input
              name='amount'
              value={form.amount}
              type='number'
              onChange={(e) =>
                setForm({ ...form, amount: Number(e.target.value) })
              }
            />
          </Form.Item>
          <Form.Item label='Category'>
            <Select
              defaultValue={form.category_id}
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e })}
            >
              <Select.Option value={0} disabled>
                Select a category
              </Select.Option>
              {categories.map((c) => (
                <Select.Option value={c.id} key={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        columns={columns}
        dataSource={data}
        rowKey='id'
        loading={loading}
      />
    </motion.div>
  );
};

export default Records;
