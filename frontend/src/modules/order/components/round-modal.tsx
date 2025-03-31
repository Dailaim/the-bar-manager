"use client";

import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { RoundItem } from "@/types/orders";
import { Stock } from "@/types/stock";

interface RoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (items: RoundItem[]) => void;
  existingItems?: RoundItem[];
  availableStock: Stock[];
  title: string;
}

export function RoundModal({
  isOpen,
  onClose,
  onSave,
  existingItems = [],
  availableStock,
  title,
}: RoundModalProps) {
  const [items, setItems] = useState<RoundItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen && existingItems.length > 0) {
      setItems(existingItems.map((item) => ({ ...item })));
    }
  }, [isOpen, existingItems]);

  if (!isOpen) return null;

  const addItem = (stockItem: Stock) => {
    const existingItem = items.find((item) => item.id === stockItem.id);

    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === stockItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([
        ...items,
        { id: stockItem.id, name: stockItem.name, quantity: 1 },
      ]);
    }
  };

  const removeItem = (id: string) => {
    const existingItem = items.find((item) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSave = () => {
    onSave(items);
    setItems([]);
    onClose();
  };

  const filteredStock = availableStock.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full rounded-md border border-gray-300 p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-6 grid max-h-60 grid-cols-2 gap-2 overflow-y-auto md:grid-cols-3">
          {filteredStock.map((item) => {
            const itemQuantity = items.find((i) => i.id === item.id)?.quantity;
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-md border p-3"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Stock: {item.quantity - (itemQuantity ?? 0)}
                  </p>
                </div>
                <button
                  onClick={() => addItem(item)}
                  className="mt-2 rounded-md bg-blue-500 px-2 py-1 text-sm text-white hover:bg-blue-600"
                  disabled={item.quantity <= 0}
                >
                  Añadir
                </button>
              </div>
            );
          })}
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-medium">Productos seleccionados</h3>
          {items.length === 0 ? (
            <p className="text-gray-500">No hay productos seleccionados</p>
          ) : (
            <ul className="max-h-40 divide-y overflow-y-auto rounded-md border">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-3"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-2 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        addItem(
                          availableStock.find((stock) => stock.id === item.id)!
                        )
                      }
                      className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            disabled={items.length === 0}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
