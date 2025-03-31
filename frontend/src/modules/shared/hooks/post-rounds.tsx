import { RoundItem, OrderResponse } from "@/types/orders";
import { useMutation } from "@tanstack/react-query";
import { roundService } from "../services/round";

export const useAddRoundToOrder = () => {
  return useMutation<
    OrderResponse,
    Error,
    { orderid: string; round: RoundItem[] }
  >({
    mutationKey: ["round"],
    mutationFn: (data) => {
      return roundService.addToOrder(data.orderid, data.round);
    },
  });
};

export const useDeleteRoundFromOrder = () => {
  return useMutation<
    OrderResponse,
    Error,
    { orderid: string; roundId: string }
  >({
    mutationKey: ["round"],
    mutationFn: (data) => {
      return roundService.deleteFromOrder(data.orderid, data.roundId);
    },
  });
};

export const useUpdateRoundInOrder = () => {
  return useMutation<
    OrderResponse,
    Error,
    {
      orderid: string;
      roundId: string;
      round: RoundItem[];
    }
  >({
    mutationKey: ["round"],
    mutationFn: (id) => {
      return roundService.updateInOrder(id.orderid, id.roundId, id.round);
    },
  });
};
