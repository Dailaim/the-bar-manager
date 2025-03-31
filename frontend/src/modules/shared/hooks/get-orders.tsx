import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/order";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return orderService.getAll();
    },
  });
};
