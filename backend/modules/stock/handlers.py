from modules.stock.services import get_items
from modules.stock.models import StockResponse
from datetime import datetime 

def get_all_stock() -> StockResponse:
  items = get_items()
  items_list = list(items.values())
  
  stock_response = StockResponse(
    last_updated=datetime.now(),
    beers=items_list
  )
  
  return stock_response