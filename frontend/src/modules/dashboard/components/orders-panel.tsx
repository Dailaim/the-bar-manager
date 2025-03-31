"use client";

import { useGetStock } from "@/modules/shared/hooks/get-stock";
import { useGetOrders } from "@/modules/shared/hooks/get-orders";
import {
  useAddOrder,
  useDeleteOrder,
} from "@/modules/shared/hooks/post-orders";
import { RoundItem } from "@/types/orders";
import { toast } from "sonner";
import { RecentOrders } from "./recent-orders";
import { CreateOrder } from "./create-order";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

type OrderItem = {
  productId: string;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
  status: "pending" | "completed" | "cancelled";
};

export function OrdersPanel() {
  const { data: ordersData, refetch: refetchOrders } = useGetOrders();
  const { data: stockData, refetch: refetchStock } = useGetStock();
  const { mutate: addOrder } = useAddOrder();
  const { mutate: deleteOrderFetch } = useDeleteOrder();

  const deleteOrder = (id: string) => {
    deleteOrderFetch(id, {
      onSuccess: () => {
        refetchOrders();
        refetchStock();
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  };

  const createOrder = (order: RoundItem[], cb?: () => void) => {
    if (order.length === 0) return;

    addOrder(
      {
        round: order,
      },
      {
        onSuccess: () => {
          toast.success("Orden creada exitosamente", {
            position: "top-center",
          });
        },
        onError: (error) => {
          toast.error(error.message, {
            position: "top-center",
          });
        },
        onSettled: () => {
          refetchOrders();
          refetchStock();
          cb?.();
        },
      }
    );
  };

  return (
    <div className="text-neutral-900">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-2xl font-bold">Órdenes</h1>
      </div>
      <CreateOrder stock={stockData?.beers ?? []} onCreateOrder={createOrder} />
      <RecentOrders
        orders={ordersData?.orders ?? []}
        onDeleteOrder={deleteOrder}
      />
    </div>
  );
}
