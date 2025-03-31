import { ErrorAPI, Stock, StockResponse } from "@/types/stock";
import { useMutation } from "@tanstack/react-query";
import { stockService } from "../services/stock";

export const useEditStock = () => {
  return useMutation<StockResponse, Error, Partial<Stock> & { id: string }>({
    mutationKey: ["stock"],
    mutationFn: (data) => {
      return stockService.update(data.id, data);
    },
  });
};

export const useAddStock = () => {
  return useMutation<StockResponse, Error, Omit<Stock, "id">>({
    mutationKey: ["stock"],
    mutationFn: (data) => {
      return stockService.add(data);
    },
  });
};

export const useDeleteStock = () => {
  return useMutation<StockResponse, Error, string>({
    mutationKey: ["stock"],
    mutationFn: (id) => {
      return stockService.delete(id);
    },
  });
};
