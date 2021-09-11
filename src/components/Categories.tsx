import { Table, Tag, Space } from "antd";
import { Category } from "../types/category";
import React from "react";

const Categories = () => {
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
  return <Table columns={columns} dataSource={data} />;
};

export default Categories;
