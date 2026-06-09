import {Menu } from "antd"
import {} from "@ant-design/icons"
export default function Sidebar() {
  return (
    <aside className="w-50 bg-gray-900 text-white p-5">
      <h1 className="text-base font-bold mb-8">
        Product Dashboard
      </h1>

      <nav className="flex flex-col gap-4 justify-center">
        <button className="text-left hover:text-gray-300">
          Overview
        </button>

        <button className="text-left hover:text-gray-300">
          Products
        </button>

        <button className="text-left hover:text-gray-300">
          Analytics
        </button>

        <button className="text-left hover:text-gray-300">
          Settings
        </button>
      </nav>

      <Menu/>
    </aside>
  );
}