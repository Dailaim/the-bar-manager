from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import List
from database.orders import OrderItem, OrderRound, OrderRoundItem, Order

class CreateOrder(BaseModel):
    round: List[OrderRoundItem]
    
class PricesOrder(BaseModel):
  subtotal: float
  taxes: float
  total: float
  discounts: float
  
  
class CreateRound(BaseModel):
    items: List[OrderRoundItem]
  
    
class OrdersResponse(BaseModel):
    orders: List[Order]
    last_updated: datetime
    
class OrderResponse(BaseModel):
    order: Order