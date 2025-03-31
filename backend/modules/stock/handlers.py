from modules.stock import services
from modules.stock.models import StockResponse, StockItemResponse, ItemUpdate, CreateItem
from datetime import datetime 

def get_all_stock() -> StockResponse:
  items = services.get_items()
  items_list = list(items.values())
  
  stock_response = StockResponse(
    last_updated=datetime.now(),
    beers=items_list
  )
  
  return stock_response

def post_stock(create_data: CreateItem) -> StockItemResponse:
    item = services.create_item(create_data.name, create_data.price, create_data.quantity)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def get_stock_by_id(item_id: str) -> StockItemResponse:
    item = services.get_item(item_id)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def update_stock(item_id: str, update_data: ItemUpdate) -> StockItemResponse:

    item = services.update_item(item_id, update_data)
    item_response = StockItemResponse(beer=item)
    
    return item_response
  
def delete_stock(item_id: str) -> StockItemResponse:
    item = services.delete_item(item_id)
    item_response = StockItemResponse(beer=item)
    
    return item_response