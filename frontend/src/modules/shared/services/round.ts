
import { RoundItem, Round, OrderResponse } from "@/types/orders";

import { API_URL } from "../constants";
import { ErrorAPI } from "@/types/stock";

class RoundService {
  constructor(private baseUrl: string) {}

  private async parserResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const data: ErrorAPI = await response.json();
      throw new Error(data.detail);
    }
    return response.json();
  }

  async addToOrder(id: string, data: RoundItem[]) {
    const response = await fetch(this.baseUrl + "/orders/" + id + "/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: data,
      }),
    });
    return this.parserResponse<OrderResponse>(response);
  }

  async deleteFromOrder(id: string, roundId: string) {
    const response = await fetch(
      this.baseUrl + "/orders/" + id + "/rounds/" + roundId,
      {
        method: "DELETE",
      }
    );
    return this.parserResponse<OrderResponse>(response);
  }

  async updateInOrder(id: string, roundId: string, data: RoundItem[]) {
    const response = await fetch(
      this.baseUrl + "/orders/" + id + "/rounds/" + roundId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: data,
        }),
      }
    );
    return this.parserResponse<OrderResponse>(response);
  }
}

export const roundService = new RoundService(API_URL);
