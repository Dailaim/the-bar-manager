from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from modules.stock.handlers import get_all_stock, post_stock, get_stock_by_id, update_stock, delete_stock
from modules.stock.models import StockResponse, StockItemResponse, ItemUpdate, CreateItem
from typing import Optional
StockRouter = APIRouter(prefix="/stock")

@StockRouter.get("", response_model=StockResponse)
def get_stock() -> JSONResponse:
    response = get_all_stock()
    return response
  
@StockRouter.post("", response_model=StockItemResponse)
def post_stock_(item: CreateItem):
    response = post_stock(item.name, item.price, item.quantity)
    return response
  
@StockRouter.get("/{item_id}", response_model=StockItemResponse)
def get_stock_by_id_(item_id: str) -> JSONResponse:
    response = get_stock_by_id(item_id)
    return response
  
@StockRouter.put("/{item_id}", response_model=StockItemResponse)
def update_stock_(item_id: Optional[str] = None, item: ItemUpdate = ItemUpdate()):
    response = update_stock(item_id, item)
    return response
  
@StockRouter.delete("/{item_id}", response_model=StockItemResponse)
def delete_stock_(item_id: str) -> JSONResponse:
    response = delete_stock(item_id)
    return response