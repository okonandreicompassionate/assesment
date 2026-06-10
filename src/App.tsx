import { useState, useEffect } from "react";
import { Drawer, Input, Select, Modal, Button } from "antd";


import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";
import Footer from "./components/footer";
import Cards from "./components/cards";
import ProductTable from "./components/producttable";

import { getProducts } from "./api/products";
import type { Product } from "./types/product";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0, title: "", price: 0, description: "", category: "", image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const deleteProduct = (id: number) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const updateProduct = (updated: Product) =>
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));

  const addProduct = () => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
    setNewProduct({ id: 0, title: "", price: 0, description: "", category: "", image: "" });
    setIsAddModalOpen(false);
  };

  const uniqueCategories = [...new Set(products.map((p) => p.category))];
  const categoryOptions = uniqueCategories.map((c) => ({ label: c, value: c }));
  const categories = products.map((p) => p.category);
  const avgPrice =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) / products.length
      : 0;

  const filteredProducts = products.filter((p) => {
    const matchesTitle = p.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesTitle && matchesCategory && matchesPrice;
  });

  return (
    // KEY FIX: overflow-hidden on root, min-w-0 on children to prevent blowout
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />

        {/* pb-16 = space for mobile bottom nav */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 pb-16 md:pb-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h3 className="text-base font-bold mb-3">Filters</h3>

            {/* Stack filters vertically on mobile */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Input
                className="w-full sm:w-48"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <Select
                className="w-full sm:w-48"
                placeholder="Category"
                allowClear
                options={categoryOptions}
                value={selectedCategory || undefined}
                onChange={(value) => setSelectedCategory(value ?? "")}
              />

              <div className="flex gap-2 w-full sm:w-auto">
                <label htmlFor=""> min</label>
                <Input
                  className="flex-1 sm:w-24"
                  type="number"
                  placeholder="Min $"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <label htmlFor=""> max</label>
                <Input
                  className="flex-1 sm:w-24"
                  type="number"
                  placeholder="Max $"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              <Button
                type="primary"
                className="w-full sm:w-auto"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add Product
              </Button>
            </div>
          </div>

          <div className="mb-4">
            <Cards products={products} categories={categories} avgPrice={avgPrice} />
          </div>

          <div className="bg-white rounded-xl shadow p-3 md:p-4">
            <ProductTable
              products={filteredProducts}
              onRowClick={handleRowClick}
              onDelete={deleteProduct}
            />
          </div>
        </main>

        <Footer />
      </div>

      {/* Edit drawer — full width on mobile */}
      <Drawer
  title="Product Details"
  open={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  width={typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 420}
>
  {selectedProduct && (
    <div className="flex flex-col gap-5">

      {/* Image */}
      <div className="rounded-xl border bg-gray-50 p-3 flex items-center justify-center h-48">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="max-h-full max-w-full object-contain rounded"
        />
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Title
        </label>
        <Input
          size="large"
          value={selectedProduct.title}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
        />
      </div>

      {/* Price + Category */}
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Price
          </label>
          <Input
            size="large"
            type="number"
            prefix={<span className="text-gray-400 text-sm">$</span>}
            value={selectedProduct.price}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })}
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Category
          </label>
          <Input
            size="large"
            value={selectedProduct.category}
            onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Description
        </label>
        <Input.TextArea
          rows={4}
          value={selectedProduct.description}
          onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
          style={{ resize: "none" }}
        />
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={() => {
          updateProduct(selectedProduct);
          setIsDrawerOpen(false);
        }}
      >
        Save Changes
      </Button>

    </div>
  )}
</Drawer>
      {/* Add modal */}
<Modal
  title="New Product"
  open={isAddModalOpen}
  onCancel={() => setIsAddModalOpen(false)}
  onOk={addProduct}
  okText="Add Product"
  style={{ top: 20 }}
  width={typeof window !== "undefined" && window.innerWidth < 768 ? "95vw" : 520}
  styles={{ body: { paddingTop: 12, paddingBottom: 8 } }}
>
  <div className="flex flex-col gap-5 py-2">

    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Title
      </label>
      <Input
        size="large"
        placeholder="e.g. Wireless Headphones"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
    </div>

    <div className="flex gap-3">
      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Price
        </label>
        <Input
          size="large"
          type="number"
          prefix={<span className="text-gray-400 text-sm">$</span>}
          placeholder="0.00"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Category
        </label>
        <Input
          size="large"
          placeholder="e.g. Electronics"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
      </div>
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Image URL
      </label>
      <Input
        size="large"
        placeholder="https://..."
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      {newProduct.image && (
        <div className="mt-1.5 rounded-lg border bg-gray-50 p-2 flex items-center justify-center h-24">
          <img
            src={newProduct.image}
            alt="preview"
            className="max-h-full max-w-full object-contain rounded"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </div>
      )}
    </div>

    <div className="flex flex-col gap-1.5 mt-[302px]">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        Description
      </label>
      <Input.TextArea
        rows={3}
        placeholder="Brief description of the product..."
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        style={{ resize: "none" }}
      />
    </div>

  </div>
</Modal>
    </div>
  );
}