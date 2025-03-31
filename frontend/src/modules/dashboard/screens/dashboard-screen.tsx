"use client";
import { useEffect } from "react";

import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import { OrdersPanel } from "../components/orders-panel";
import { StockPanel } from "../components/stock-panel";

type ActivePanel = "orders" | "stock" | "rounds";

export function DashboardScreen() {
  const [activePanel, setActivePanel] = useState<ActivePanel>("orders");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePanel={activePanel} setActivePanel={setActivePanel} />
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-7xl">
          {activePanel === "orders" && <OrdersPanel />}
          {activePanel === "stock" && <StockPanel />}
        </div>
      </main>
    </div>
  );
}
