import { StocksResponse, StockResponse, Stock, ErrorAPI } from "@/types/stock";
import { API_URL } from "../constants";

class StockService {
  constructor(private baseUrl: string) {}

   private async parserResponse<T>(response: Response): Promise<T> {
      if (!response.ok) {
        const data: ErrorAPI = await response.json();
        throw new Error(data.detail);
      }
      return response.json();
    }

  async getAll() {
    const response = await fetch(this.baseUrl + "/stock");
    return this.parserResponse<StocksResponse>(response);
  }

  async getById(id: string) {
    const response = await fetch(this.baseUrl + "/stock/" + id);
    return this.parserResponse<StockResponse>(response);
  }

  async add(data: Omit<Stock, "id">) {
    const response = await fetch(this.baseUrl + "/stock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<StockResponse>(response);
  }

  async update(id: string, data: Partial<Stock>) {
    const response = await fetch(this.baseUrl + "/stock/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<StockResponse>(response);
  }
  
  async delete(id: string) {
    const response = await fetch(this.baseUrl + "/stock/" + id, {
      method: "DELETE",
    });
    return this.parserResponse<StockResponse>(response);
  }
}

export const stockService = new StockService(API_URL);