from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from modules.orders import handlers 
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound, CreateOrder

OrdersRouter = APIRouter(prefix="/orders")

@OrdersRouter.get("/", response_model=OrdersResponse)
def get_orders() -> JSONResponse:
    response = handlers.get_all_orders()
    return response

@OrdersRouter.post("/", response_model=OrderResponse)
def post_orders(order: CreateOrder) -> JSONResponse:
    response = handlers.post_order(order)
    return response
  
@OrdersRouter.delete("/", response_model=OrderResponse)
def delete_orders(order_id: str) -> JSONResponse:
    response = handlers.delete_order(order_id)
    return response

@OrdersRouter.get("/{order_id}", response_model=OrderResponse)
def get_orders_by_id(order_id: str) -> JSONResponse:
    response = handlers.get_order_by_id(order_id)
    return response
  
@OrdersRouter.delete("/{order_id}", response_model=OrderResponse)
def delete_orders_by_id(order_id: str) -> JSONResponse:
    response = handlers.delete_order(order_id)
    return response
  
@OrdersRouter.put("/{order_id}/pay", response_model=OrderResponse)
def pay_order_(order_id: str) -> JSONResponse:
    response = handlers.pay_order(order_id)
    return response
  
@OrdersRouter.post("/{order_id}/rounds", response_model=OrderResponse)
def post_rounds(order_id: str, _round: CreateRound) -> JSONResponse:
    response = handlers.add_round(order_id, _round)
    return response
  
@OrdersRouter.delete("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def delete_rounds(order_id: str, round_id: str) -> JSONResponse:
    response = handlers.remove_round(order_id, round_id)
    return response
  
@OrdersRouter.put("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def put_rounds(order_id: str, round_id: str, round: CreateRound) -> JSONResponse:
    response = handlers.update_round(order_id, round_id, round)
    return response