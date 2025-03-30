from modules.orders.services import get_orders, get_order_by_id
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound
from datetime import datetime 
from fastapi import HTTPException

def get_all_orders() -> OrdersResponse:
  orders = get_orders()
  orders_list = list(orders.values())
  
  orders_response = OrdersResponse(
    last_updated=datetime.now(),
    orders=orders_list
  )
  
  return orders_response

def get_order_by_id(order_id: str) -> OrderResponse:
  order = get_order_by_id(order_id)

  order_response = OrderResponse(
    order=order
  )
  
  return order_response

def add_round(order_id: str, round: CreateRound) -> OrderResponse:
  
  order = add_round(order_id, round)
  order_response = OrderResponse(
    order=order
  )
  
  return order_response

def remove_round(order_id: str, round_id: str) -> OrderResponse:
  order = remove_round(order_id, round_id)
  order_response = OrderResponse(
    order=order
  )
  
  return order_response

def update_round(order_id: str, round_id: str, round: CreateRound) -> OrderResponse:
  order = update_round(order_id, round_id, round)
  order_response = OrderResponse(
    order=order
  )
  
  return order_response