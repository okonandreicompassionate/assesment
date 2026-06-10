import type { Product } from "../types/product";
import { Table, Button } from "antd";
import { Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";

type ProductTableProps = {
  products: Product[];
  onRowClick: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductTable({ products, onRowClick, onDelete }: ProductTableProps) {
  const columns: ColumnsType<Product> = [
    {
      title: "Image",
      dataIndex: "image",
      width: 70,
      render: (image: string) => (
        <img src={image} alt="product" className="w-12 h-12 object-contain rounded" />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 90,
      render: (price: number) => `$${price}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 130,
      responsive: ["lg"],
    },
    {
      title: "Description",
      dataIndex: "description",
      responsive: ["xl"],
      render: (desc: string) => desc.split(" ").slice(0, 10).join(" ") + "...",
    },
    {
      title: "",
      width: 70,
      render: (_, record) => (
        <Button
          danger
          size="small"
          onClick={(e) => { e.stopPropagation(); onDelete(record.id); }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 md:hidden">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              onClick={() => onRowClick(product)}
              className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-12 h-12 flex-shrink-0 object-contain rounded-lg bg-gray-50 p-1"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{product.title}</p>
                <p className="text-xs text-gray-400 capitalize truncate">{product.category}</p>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">${product.price}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
                className="flex-shrink-0 p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          scroll={{ x: 600 }}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
            style: { cursor: "pointer" },
          })}
        />
      </div>
    </>
  );
}