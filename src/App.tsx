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
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
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
  }, [products]);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );
  };

  const addProduct = () => {
    const productToAdd: Product = {
      ...newProduct,
      id: Date.now(),
    };

    setProducts((prev) => [...prev, productToAdd]);

    setNewProduct({
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    });

    setIsAddModalOpen(false);
  };

  const uniqueCategories = [
    ...new Set(products.map((p) => p.category)),
  ];

  const categoryOptions = uniqueCategories.map((category) => ({
    label: category,
    value: category,
  }));

  const categories = products.map((p) => p.category);

  const avgPrice =
    products.length > 0
      ? products.reduce((sum, p) => sum + p.price, 0) /
        products.length
      : 0;

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      product.category === selectedCategory;

    const matchesPrice =
      product.price >= minPrice &&
      product.price <= maxPrice;

    return (
      matchesTitle &&
      matchesCategory &&
      matchesPrice
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">
              Filters
            </h3>

            <div className="flex flex-wrap gap-3 items-center">
              <Input
                className="w-56"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />

              <Select
                className="w-56"
                placeholder="Category"
                allowClear
                options={categoryOptions}
                value={selectedCategory || undefined}
                onChange={(value) =>
                  setSelectedCategory(value ?? "")
                }
              />

              <Input
                className="w-24"
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Number(e.target.value))
                }
              />

              <Input
                className="w-24"
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
              />

              <Button
                type="primary"
                onClick={() =>
                  setIsAddModalOpen(true)
                }
              >
                Add Product
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Cards
              products={products}
              categories={categories}
              avgPrice={avgPrice}
            />
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <ProductTable
              products={filteredProducts}
              onRowClick={handleRowClick}
              onDelete={deleteProduct}
            />
          </div>
        </main>

        <Footer />
      </div>

      <Drawer
        title="Product Details"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        width={420}
      >
        {selectedProduct && (
          <div className="space-y-3">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="w-full rounded"
            />

            <Input
              value={selectedProduct.title}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  title: e.target.value,
                })
              }
            />

            <Input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: Number(e.target.value),
                })
              }
            />

            <Input
              value={selectedProduct.category}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  category: e.target.value,
                })
              }
            />

            <Input.TextArea
              value={selectedProduct.description}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />

            <Button
              type="primary"
              block
              onClick={() => {
                if (!selectedProduct) return;

                updateProduct(selectedProduct);
                setIsDrawerOpen(false);
              }}
            >
              Save Changes
            </Button>
          </div>
        )}
      </Drawer>

      <Modal
        title="Add Product"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={addProduct}
      >
        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                title: e.target.value,
              })
            }
          />

          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: Number(e.target.value),
              })
            }
          />

          <Input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category: e.target.value,
              })
            }
          />

          <Input
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                image: e.target.value,
              })
            }
          />

          <Input.TextArea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                description: e.target.value,
              })
            }
          />
        </div>
      </Modal>
    </div>
  );
}