import type { Product } from "../types/product";

type ProductTableProps = {
  products: Product[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div>
      <h2>Product Table Coming</h2>
      <p>{products.length} items loaded</p>
    </div>
  );
}