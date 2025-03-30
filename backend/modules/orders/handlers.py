from modules.orders.services import (
    get_orders as fetch_orders,
    get_order_by_id as fetch_order_by_id,
    create_order as create_new_order,
    add_round as append_round,
    remove_round as delete_round,
    update_round as modify_round
)
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound, CreateOrder
from datetime import datetime
from fastapi import HTTPException

def get_all_orders() -> OrdersResponse:
    orders = fetch_orders()  # Usamos el alias para evitar la recursión
    orders_list = list(orders.values())

    orders_response = OrdersResponse(
        last_updated=datetime.now(),
        orders=orders_list
    )

    return orders_response

def post_order(order: CreateOrder) -> OrderResponse:
    order = create_new_order(order)  # Usamos el alias
    order_response = OrderResponse(order=order)
    
    return order_response

def get_order_by_id(order_id: str) -> OrderResponse:
    order = fetch_order_by_id(order_id)  # Usamos el alias

    order_response = OrderResponse(order=order)
    
    return order_response

def add_round(order_id: str, round: CreateRound) -> OrderResponse:
    order = append_round(order_id, round)  # Usamos el alias
    order_response = OrderResponse(order=order)
    
    return order_response

def remove_round(order_id: str, round_id: str) -> OrderResponse:
    order = delete_round(order_id, round_id)  # Usamos el alias
    order_response = OrderResponse(order=order)
    
    return order_response

def update_round(order_id: str, round_id: str, round: CreateRound) -> OrderResponse:
    order = modify_round(order_id, round_id, round)  # Usamos el alias
    order_response = OrderResponse(order=order)
    
    return order_response
