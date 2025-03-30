from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from modules.orders.handlers import get_all_orders, get_order_by_id, post_order, add_round, remove_round, update_round
from modules.orders.models import OrdersResponse, OrderResponse, CreateRound, CreateOrder

OrdersRouter = APIRouter(prefix="/orders")

@OrdersRouter.get("/", response_model=OrdersResponse)
def get_orders() -> JSONResponse:
    response = get_all_orders()
    return response

@OrdersRouter.post("/", response_model=OrderResponse)
def post_orders(order: CreateOrder) -> JSONResponse:
    response = post_order(order)
    return response

@OrdersRouter.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(order_id: str) -> JSONResponse:
    response = get_order_by_id(order_id)
    return response
  
@OrdersRouter.post("/{order_id}/rounds", response_model=OrderResponse)
def post_round(order_id: str, _round: CreateRound) -> JSONResponse:
    response = add_round(order_id, _round)
    return response
  
@OrdersRouter.delete("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def delete_round(order_id: str, round_id: str) -> JSONResponse:
    response = remove_round(order_id, round_id)
    return response
  
@OrdersRouter.put("/{order_id}/rounds/{round_id}", response_model=OrderResponse)
def put_round(order_id: str, round_id: str, round: CreateRound) -> JSONResponse:
    response = update_round(order_id, round_id, round)
    return response