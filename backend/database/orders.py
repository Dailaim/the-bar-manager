from typing import List, Dict, Union, TypedDict
from datetime import datetime

class OrderItem(TypedDict):
    name: str
    quantity: int
    total: float
    price_per_unit: float
    id: int
    
class OrderRoundItem(TypedDict):
    name: str
    quantity: int
    id: int

class OrderRound(TypedDict):
    created:  datetime
    items: List[OrderRoundItem]

class Order(TypedDict):
    created: datetime
    paid: bool
    subtotal: float
    taxes: float
    discounts: float
    items: List[OrderItem]  # Puede estar vacío
    rounds: List[OrderRound]
    id: str

Orders = Dict[str, Order]

orders: Orders = {
    "1": {
        "created": datetime(2023, 1, 1).timestamp(),
        "paid": False,
        "subtotal": 120,
        "total": 120,
        "taxes": 10,
        "discounts": 0,
        "id": "1",
        "items": [],
        "rounds": [
            {
                "created": datetime(2023, 1, 1),
                "items": [
                    {
                        "name": "Corona",
                        "quantity": 2,
                        "id": 1
                    },
                    {
                        "name": "Quilmes",
                        "quantity": 0,
                        "id": 2
                    }
                ]
            }
        ],
    },
    
}
