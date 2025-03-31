
import { OrdersResponse, OrderResponse, CreateOrder } from "@/types/orders";

import { API_URL } from "../constants";
import { ErrorAPI } from "@/types/stock";

class OrderService {
  constructor(private baseUrl: string) {}

  private async parserResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const data: ErrorAPI = await response.json();
      throw new Error(data.detail);
    }
    return response.json();
  }

  async getAll() {
    const response = await fetch(this.baseUrl + "/orders");
    return this.parserResponse<OrdersResponse>(response);
  }

  async getById(id: string) {
    const response = await fetch(this.baseUrl + "/orders/" + id);
    return this.parserResponse<OrderResponse>(response);
  }

  async add(data: CreateOrder) {
    const response = await fetch(this.baseUrl + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<OrderResponse>(response);
  }

  async delete(id: string) {
    const response = await fetch(this.baseUrl + "/orders/" + id, {
      method: "DELETE",
    });
    return this.parserResponse<OrderResponse>(response);
  }

  async pay(id: string) {
    const response = await fetch(this.baseUrl + "/orders/" + id + "/pay", {
      method: "PUT",
    });
    return this.parserResponse<OrderResponse>(response);
  }
}

export const orderService = new OrderService(API_URL);