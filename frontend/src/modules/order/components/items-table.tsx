import { OrderItem } from "@/types/orders";
import React from "react";

interface ItemsTableProps {
  items: OrderItem[];
}

export const ItemsTable = ({ items }: ItemsTableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Producto
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Precio
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Cantidad
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Total
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.id}>
            <td className="whitespace-nowrap px-4 py-3">{item.name}</td>
            <td className="whitespace-nowrap px-4 py-3">
              ${item.price_per_unit.toFixed(2)}
            </td>
            <td className="whitespace-nowrap px-4 py-3">{item.quantity}</td>
            <td className="whitespace-nowrap px-4 py-3">
              ${item.total.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
