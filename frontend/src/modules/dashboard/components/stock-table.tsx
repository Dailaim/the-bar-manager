import { Stock } from "@/types/stock";
import React, { useState } from "react";
import { Edit, Save, Trash, X } from "lucide-react";

interface StockTableProps {
  stock: Stock[];
  onSaveChanges: (
    item: Partial<Stock> & { id: string },
    cb?: () => void
  ) => void;
  onDeleteStock: (id: string) => void;
  onAddStock: (data: Omit<Stock, "id">, cb?: () => void) => void;
}

const isLowStock = (item: Stock) => {
  return item.quantity === 0;
};

const newStock: Stock = {
  id: "created",
  name: "",
  price: 0,
  quantity: 0,
};

export const StockTable = ({
  stock,
  onSaveChanges,
  onAddStock,
  onDeleteStock,
}: StockTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<Stock>>({});

  const cancelEditing = () => {
    setEditingId(null);
    setEditedValues({});
  };

  const createNewStock = () => {
    setEditingId(newStock.id);
    setEditedValues(newStock);
  };

  const saveOrCreate = (stock: Stock) => {
    if (stock.id === newStock.id) {
      onAddStock(stock, cancelEditing);
    } else {
      onSaveChanges(
        {
          ...stock,
        },
        cancelEditing
      );
    }
  };

  const startEditing = (item: Stock) => {
    setEditingId(item.id);
    setEditedValues(item);
  };

  const handleEditChange = (field: keyof Stock, value: string | number) => {
    setEditedValues({
      ...editedValues,
      [field]: value,
    });
  };

  return (
    <>
      <div className="flex justify-end mb-3">
        <button
          onClick={() => createNewStock()}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Añadir
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...stock, ...(editingId === newStock.id ? [newStock] : [])].map(
                (item) => (
                  <tr
                    key={item.id}
                    className={isLowStock(item) ? "bg-red-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          placeholder={item.name}
                          className="border rounded px-2 py-1 w-full text-neutral-900"
                          value={editedValues.name || ""}
                          onChange={(e) =>
                            handleEditChange("name", e.target.value)
                          }
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          placeholder={item.quantity.toString()}
                          min="0"
                          className="border rounded px-2 py-1 w-24 text-neutral-900"
                          value={editedValues.quantity || 0}
                          onChange={(e) =>
                            handleEditChange(
                              "quantity",
                              Number.parseInt(e.target.value)
                            )
                          }
                        />
                      ) : (
                        <div className="text-sm text-gray-900 ml-1">
                          {item.quantity}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          min="0"
                          placeholder={item.price.toString()}
                          className="border rounded px-2 py-1 w-24 text-neutral-900"
                          value={editedValues.price}
                          onChange={(e) =>
                            handleEditChange(
                              "price",
                              Number.parseInt(e.target.value)
                            )
                          }
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {item.price}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === item.id ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() =>
                              saveOrCreate({
                                ...item,
                                ...editedValues,
                              })
                            }
                            className="text-green-600 hover:text-green-900"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="text-red-600 hover:text-red-900"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => startEditing(item)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => onDeleteStock(item.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
