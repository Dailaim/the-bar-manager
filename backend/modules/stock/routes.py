from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from modules.stock.handlers import get_all_stock, post_stock, get_stock_by_id, update_stock, delete_stock
from modules.stock.models import StockResponse, StockItemResponse, ItemUpdate
from typing import Optional
StockRouter = APIRouter(prefix="/stock")

@StockRouter.get("/", response_model=StockResponse)
def get_stock() -> JSONResponse:
    response = get_all_stock()
    return response
  
@StockRouter.post("/", response_model=StockItemResponse)
def post_stock_(name: str, price: int, quantity: int) -> JSONResponse:
    response = post_stock(name, price, quantity)
    return response
  
@StockRouter.get("/{item_id}", response_model=StockItemResponse)
def get_stock_by_id_(item_id: str) -> JSONResponse:
    response = get_stock_by_id(item_id)
    return response
  
@StockRouter.put("/{item_id}", response_model=StockItemResponse)
def update_stock_(item_id: Optional[str] = None, name: Optional[str] = None, price: Optional[int] = None, quantity: Optional[int] = None) -> JSONResponse:
    response = update_stock(item_id, ItemUpdate(name=name, price=price, quantity=quantity))
    return response
  
@StockRouter.delete("/{item_id}", response_model=StockItemResponse)
def delete_stock_(item_id: str) -> JSONResponse:
    response = delete_stock(item_id)
    return response