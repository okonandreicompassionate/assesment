import { useState } from "react";
import {
  LayoutDashboard, Package, BarChart2,
  Settings, ChevronRight, ChevronLeft, Store,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Products", icon: Package },
  { label: "Analytics", icon: BarChart2 },
  { label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <aside
        className={`
          hidden md:flex flex-col flex-shrink-0 bg-gray-900 text-white
          transition-all duration-300 ease-in-out
          ${expanded ? "w-52" : "w-16"}
        `}
      >
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-2 px-4 py-5 hover:bg-gray-800 transition-colors w-full min-w-0"
        >
          <Store size={20} className="flex-shrink-0 text-indigo-400" />
          {expanded && (
            <span className="text-xs font-bold truncate flex-1 text-left">
              Product Dashboard
            </span>
          )}
          <span className="ml-auto flex-shrink-0">
            {expanded
              ? <ChevronLeft size={13} className="text-gray-400" />
              : <ChevronRight size={13} className="text-gray-400" />}
          </span>
        </button>

        <div className="h-px bg-gray-700 mx-3 mb-2" />

        <nav className="flex flex-col gap-1 px-2 flex-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white w-full min-w-0"
            >
              <Icon size={17} className="flex-shrink-0" />
              {expanded && (
                <span className="text-sm truncate">{label}</span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 flex justify-around items-center h-14 px-2">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-0.5 text-gray-400 hover:text-indigo-400 transition-colors flex-1 py-1"
          >
            <Icon size={19} />
            <span className="text-[10px] leading-tight">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}