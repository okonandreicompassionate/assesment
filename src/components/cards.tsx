import {} from "@ant-design/icons"
import type { Product } from "../types/product";
//import type { Category} from "../types/product";
// import type {avgprice } from "../types/product";
export default function Cards({products, categories, avgPrice}: {products: Product[], categories: string[], avgPrice: number}) {
  return (
    <div className="flex space-x-4">
        <div className="bg-white shadow rounded-xl p-6 w-64">
                  <p className="text-gray-500">Total Products</p>

                  <h2 className="text-3xl font-bold text-indigo-600">
                    {products.length}
                  </h2>
                </div>

            


                <div className="bg-white shadow rounded-xl p-6 w-64">
                  <p className="text-gray-500">Total categories

                  </p>

                  <h2 className="text-3xl font-bold text-indigo-600">
                    {categories.length}
                  </h2>
                </div>


                 <div className="bg-white shadow rounded-xl p-6 w-64">
                  <p className="text-gray-500">Average Price

                  </p>

                  <h2 className="text-3xl font-bold text-indigo-600">
                    {avgPrice.toFixed(2)}
                  </h2>
                </div>
     
    </div>
  );
}