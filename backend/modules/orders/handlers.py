from modules.orders import services
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound, CreateOrder
from datetime import datetime

def get_all_orders() -> OrdersResponse:
    orders = services.get_orders()
    orders_list = list(orders.values())
    
    orders_response = OrdersResponse(
        last_updated=datetime.now(),
        orders=orders_list
    )

    return orders_response

def post_order(order: CreateOrder) -> OrderResponse:
    order = services.create_order(order)
    order_response = OrderResponse(order=order)
    
    return order_response
  
def delete_order(order_id: str) -> OrderResponse:
    order = services.delete_order(order_id)  
    order_response = OrderResponse(order=order)
    
    return order_response

def get_order_by_id(order_id: str) -> OrderResponse:
    order = services.get_order_by_id(order_id)  
    order_response = OrderResponse(order=order)
    
    return order_response

def add_round(order_id: str, round: CreateRound) -> OrderResponse:
    order = services.add_round(order_id, round)
    order_response = OrderResponse(order=order)
    
    return order_response


def remove_round(order_id: str, round_id: str) -> OrderResponse:
    order = services.remove_round(order_id, round_id)
    order_response = OrderResponse(order=order)
    
    return order_response

def update_round(order_id: str, round_id: str, round: CreateRound) -> OrderResponse:
    order = services.update_round(order_id, round_id, round)
    order_response = OrderResponse(order=order)
    
    return order_response

def pay_order(order_id: str) -> OrderResponse:
    order = services.pay_order(order_id)  
    order_response = OrderResponse(order=order)
    
    return order_response