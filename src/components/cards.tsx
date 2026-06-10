import type { Product } from "../types/product";

export default function Cards({
  products,
  categories,
  avgPrice,
}: {
  products: Product[];
  categories: string[];
  avgPrice: number;
}) {
  const stats = [
    { label: "Total Products", value: String(products.length) },
    { label: "Categories", value: String(new Set(categories).size) },
    { label: "Avg Price", value: `$${avgPrice.toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-4 w-full">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white shadow-sm rounded-xl md:rounded-2xl px-3 py-3 md:p-6 border"
        >
          <p className="text-gray-400 text-[11px] md:text-sm mb-1 md:mb-2 leading-tight">
            {stat.label}
          </p>
          <h2 className="text-xl md:text-4xl font-bold text-indigo-600 truncate">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}