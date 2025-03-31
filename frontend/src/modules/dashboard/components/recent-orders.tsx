import { Order } from "@/types/orders";
import Link from "next/link";
import React from "react";

import { Check, Edit, Trash } from "lucide-react";

interface RecentOrdersProps {
  orders: Order[];
  onDeleteOrder: (orderId: string) => void;
}

export const RecentOrders = ({ orders, onDeleteOrder }: RecentOrdersProps) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Órdenes Recientes</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No hay órdenes recientes</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rounds
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {order.id.substring(0, 8)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {order.items
                      .map((item) => {
                        return `${item?.name} (${item.quantity})`;
                      })
                      .join(", ")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {order.rounds.length}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.paid
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.paid ? "Completada" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(order.created).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-blue-500 hover:text-blue-700 mr-3"
                      aria-label="Editar"
                    >
                      {!order.paid ? (
                        <Edit className="h-4 w-4 inline" />
                      ) : (
                        <Check className="h-4 w-4 inline" />
                      )}
                    </Link>
                    {!order.paid && (
                      <button
                        aria-label="Eliminar"
                        onClick={() => onDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4 inline" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
