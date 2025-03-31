"use client";

import { Stock } from "@/types/stock";
import { useGetStock } from "@/modules/shared/hooks/get-stock";
import {
  useAddStock,
  useDeleteStock,
  useEditStock,
} from "@/modules/shared/hooks/post-stock";
import { StockTable } from "./stock-table";

export function StockPanel() {
  const { data, refetch } = useGetStock();
  const { mutate: editStock } = useEditStock();
  const { mutate: addStock } = useAddStock();
  const { mutate: deleteStockFetch } = useDeleteStock();

  const saveChanges = (
    item: Partial<Stock> & { id: string },
    cb?: () => void
  ) => {
    editStock(
      {
        ...item,
      },
      {
        onSettled: () => {
          refetch();
          cb?.();
        },
      }
    );
  };

  const deleteStock = (id: string) => {
    deleteStockFetch(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const createStock = (data: Omit<Stock, "id">, cb?: () => void) => {
    addStock(
      {
        ...data,
      },
      {
        onSettled: () => {
          refetch();
          cb?.();
        },
      }
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">Inventario</h1>
        <h3 className="text-2xl font-bold text-black">
          {" "}
          Ultima actualización:{" "}
          {new Date(data?.last_updated || "").toLocaleDateString()}
        </h3>
      </div>

      <StockTable
        stock={data?.beers ?? []}
        onSaveChanges={saveChanges}
        onAddStock={createStock}
        onDeleteStock={deleteStock}
      />
    </div>
  );
}
