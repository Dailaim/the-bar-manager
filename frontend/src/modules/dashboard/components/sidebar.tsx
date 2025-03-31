"use client";

import { Clipboard, Package } from "lucide-react";

type SidebarProps = {
  activePanel: string;
  setActivePanel: (panel: "orders" | "stock" | "rounds") => void;
};

export function Sidebar({ activePanel, setActivePanel }: SidebarProps) {
  const menuItems = [
    { id: "orders", label: "Órdenes", icon: Clipboard },
    { id: "stock", label: "Inventario", icon: Package },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white hidden md:block">
      <div className="p-4">
        <h1 className="text-xl font-bold">Bar Dashboard</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() =>
                  setActivePanel(item.id as "orders" | "stock" | "rounds")
                }
                className={`flex w-full items-center px-4 py-3 text-left ${
                  activePanel === item.id
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
