from modules.stock.services import get_items, create_item, get_item, update_item, delete_item
from modules.stock.models import StockResponse, StockItemResponse, ItemUpdate
from datetime import datetime 

def get_all_stock() -> StockResponse:
  items = get_items()
  items_list = list(items.values())
  
  stock_response = StockResponse(
    last_updated=datetime.now(),
    beers=items_list
  )
  
  return stock_response

def post_stock(name: str, price: int, quantity: int) -> StockItemResponse:
    item = create_item(name, price, quantity)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def get_stock_by_id(item_id: str) -> StockItemResponse:
    item = get_item(item_id)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def update_stock(item_id: str, update_data: ItemUpdate) -> StockItemResponse:
    item = update_item(item_id, update_data)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def delete_stock(item_id: str) -> StockItemResponse:
    item = delete_item(item_id)
    item_response = StockItemResponse(beer=item)
    
    return item_response