import { Table, Tag, Space } from "antd";
import { Category } from "../types/category";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../store/actions/categoryAction";
import { AppState } from "../store";

const Categories = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  console.log({ data, loading, error });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories);
  }, []);

  return <Table columns={columns} dataSource={data} />;
};

export default Categories;
