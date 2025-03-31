import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/order";

export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => {
      return orderService.getById(id);
    },
  });
};
