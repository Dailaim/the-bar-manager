export interface StocksResponse {
  beers:        Stock[];
  last_updated: string;
}

export interface StockResponse {
  beers?:        Stock;
  last_updated: string;
}
 
export interface Stock {
  id:       string;
  name:     string;
  price:    number;
  quantity: number;
}

export interface ErrorAPI {
  detail: string;
}