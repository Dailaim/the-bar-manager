import { useQuery } from "@tanstack/react-query";
import { stockService } from "../services/stock";

export const useGetStock = () => {
  return useQuery({
    queryKey: ["stock"],
    queryFn: () => {
      return stockService.getAll();
    },
  });
};
