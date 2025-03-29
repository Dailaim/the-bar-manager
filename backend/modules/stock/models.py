from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from typing import List


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    quantity: Optional[int] = None


class Beer(BaseModel):
    name: str
    price: int
    quantity: int
    id: str

class StockResponse(BaseModel):
    last_updated: datetime
    beers: List[Beer]