import Sidebar from "./components/sidebar.tsx";
import Topbar from "./components/topbar.tsx";
import { getProducts } from "./api/products";
import Footer from "./components/footer.tsx";
import { useState, useEffect } from "react";
import ProductTable from "./components/producttable.tsx";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main area */}
      <div className="flex-1 flex h-screen">
        <Sidebar />
        {/* Topbar */}

        {/* Content */}
        <main className="flex flex-col flex-1">
          <Topbar />
          <div className="flex-1 p-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-bold">Welcome 👋</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white shadow rounded-xl p-6 w-64">
                  <p className="text-gray-500">Total Products</p>

                  <h2 className="text-3xl font-bold text-indigo-600">
                    {products.length}
                  </h2>
                </div>

                <ProductTable products={products} />
              </div>
            </div>
          </div>

          <footer className="">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  );
}
