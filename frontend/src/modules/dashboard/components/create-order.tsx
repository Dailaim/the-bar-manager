import React, { useState } from "react";

import { Plus, Trash } from "lucide-react";
import { Stock } from "@/types/stock";
import { RoundItem } from "@/types/orders";

interface CreateOrderProps {
  stock: Stock[];
  onCreateOrder: (order: RoundItem[], cb?: () => void) => void;
}

export const CreateOrder = ({ stock, onCreateOrder }: CreateOrderProps) => {
  const [currentOrder, setCurrentOrder] = useState<RoundItem[]>([]);

  const cancelCreating = () => {
    setCurrentOrder([]);
  };

  const getProductById = (id: string) => {
    return stock.find((product) => product.id === id);
  };

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => {
      const product = stock.find((p) => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const addToOrder = (productId: string) => {
    const existingItem = currentOrder.find((item) => item.id === productId);
    const item = stock.find((p) => p.id === productId);
    if (!item) return;

    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCurrentOrder([
        ...currentOrder,
        { id: productId, quantity: 1, name: item?.name },
      ]);
    }
  };

  const removeFromOrder = (productId: string) => {
    const existingItem = currentOrder.find((item) => item.id === productId);

    if (existingItem && existingItem.quantity > 1) {
      setCurrentOrder(
        currentOrder.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCurrentOrder(currentOrder.filter((item) => item.id !== productId));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Productos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stock.map((product) => {
            const item = currentOrder.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="border rounded-md p-3 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium ">{product.name}</h3>
                  <p className="text-gray-500 text-sm">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 text-sm">
                    {product.quantity - (item?.quantity ?? 0)}
                  </p>
                  <button
                    onClick={() => addToOrder(product.id)}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Orden Actual</h2>

        {currentOrder.length === 0 ? (
          <p className="text-gray-500">No hay productos en la orden</p>
        ) : (
          <>
            <ul className="divide-y">
              {currentOrder.map((item) => {
                const product = getProductById(item.id);
                return (
                  <li key={item.id} className="py-2 flex justify-between">
                    <div>
                      <span className="font-medium">{product?.name}</span>
                      <span className="text-gray-500 ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-3">
                        ${((product?.price || 0) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button
                onClick={() =>
                  onCreateOrder(currentOrder, () => setCurrentOrder([]))
                }
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
              >
                Crear Orden
              </button>
              <button
                onClick={cancelCreating}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
