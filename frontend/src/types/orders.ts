export interface OrdersResponse {
  last_updated: Date;
  orders:       Order[];
 }

 export interface OrderResponse {
  order: Order;
 }
 
 export interface Order {
  created:   string;
  discounts: number;
  id:        string;
  items:     OrderItem[];
  paid:      boolean;
  rounds:    Round[];
  subtotal:  number;
  taxes:     number;
  total:     number;
 }
 
 export interface OrderItem {
  id:             string;
  name:           string;
  price_per_unit: number;
  quantity:       number;
  total:          number;
 }
 
 export interface Round {
  created:  string;
  id:      string;
  items:   RoundItem[];
 }
 
 export interface RoundItem {
  id:       string;
  name:     string;
  quantity: number;
 }

 export interface CreateOrder {
    round: RoundItem[];
  }
 