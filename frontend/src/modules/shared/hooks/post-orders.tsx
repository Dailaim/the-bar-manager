import { CreateOrder, OrderResponse } from "@/types/orders";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "../services/order";

export const useAddOrder = () => {
  return useMutation<OrderResponse, Error, CreateOrder>({
    mutationKey: ["order"],
    mutationFn: async (data) => {
      return orderService.add(data);
    },
  });
};

export const usePayOrder = () => {
  return useMutation<OrderResponse, Error, string>({
    mutationKey: ["order"],
    mutationFn: async (id) => {
      return orderService.pay(id);
    },
  });
};

export const useDeleteOrder = () => {
  return useMutation<OrderResponse, Error, string>({
    mutationKey: ["order"],
    mutationFn: async (id) => {
      return orderService.delete(id);
    },
  });
};
