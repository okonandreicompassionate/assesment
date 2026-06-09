import type { Product } from "../types/product";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

type ProductTableProps = {
  products: Product[];
  onRowClick: (product: Product) => void;
  onDelete: (id: number) => void;
};


export default function ProductTable({
  products,
  onRowClick,
  onDelete,
}: ProductTableProps) {




const columns: ColumnsType<Product> = [
  {
  title: "Image",
  dataIndex: "image",
  render: (image) => (
    <img src={image} alt="product" style={{ width: 50, height: 50 }} />
  ),
},
  {
    title: "Title",
    dataIndex: "title",

  },

  {
  title: "Price",
  dataIndex: "price", 
},
{
  title: "Category",
  dataIndex: "category",
},
{
  title: "Description",
  dataIndex: "description",
}
,
{
  title: "Actions",
  render: (_, record) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(record.id);
      }}
    >
      Delete
    </button>
  ),
}

];




  return (
  <Table
  columns={columns}
  dataSource={products}
  rowKey="id"
  onRow={(record) => ({
    onClick: () => onRowClick(record),
  })}
/>
  );
}