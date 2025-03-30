from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from modules.orders.handlers import get_all_orders, get_order_by_id
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound

OrdersRouter = APIRouter(prefix="/orders")

@OrdersRouter.get("/", response_model=OrdersResponse)
def get_stock() -> JSONResponse:
    response = get_all_orders()
    return response
  
@OrdersRouter.get("/{order_id}", response_model=OrderResponse)
def get_stock(order_id: str) -> JSONResponse:
    response = get_order_by_id(order_id)
    return response
  
@OrdersRouter.post("/{order_id}/rounds", response_model=OrderResponse)
def add_round(order_id: str, round: CreateRound) -> JSONResponse:
    response = add_round(order_id, round)
    return response
  
@OrdersRouter.delete("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def remove_round(order_id: str, round_id: str) -> JSONResponse:
    response = remove_round(order_id, round_id)
    return response
  
@OrdersRouter.put("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def update_round(order_id: str, round_id: str, round: CreateRound) -> JSONResponse:
    response = update_round(order_id, round_id, round)
    return response