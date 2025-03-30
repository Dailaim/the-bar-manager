from typing import List, Dict, Union, TypedDict
from datetime import datetime
from constants.taxes import taxes

class OrderItem(TypedDict):
    name: str
    quantity: int
    total: float
    price_per_unit: float
    id: str
    
class OrderRoundItem(TypedDict):
    name: str
    quantity: int
    id: str

class OrderRound(TypedDict):
    id: str
    created:  datetime
    items: List[OrderRoundItem]

class Order(TypedDict):
    created: datetime
    paid: bool
    subtotal: float
    taxes: float
    total: float
    discounts: float
    items: List[OrderItem] 
    rounds: List[OrderRound]
    id: str

Orders = Dict[str, Order]

orders: Orders = {
    "1": Order(
        created=datetime(2023, 1, 1).timestamp(),
        paid=False,
        subtotal=115 * 2,
        total=(115 * 2 * taxes / 100) + (115 * 2),
        taxes=115 * 2 * taxes / 100,
        discounts=0,
        id="1",
        items=[
            OrderItem(
                name="Corona",
                quantity=2,
                total=115 * 2,
                price_per_unit=115,
                id="1"
            )
          ], 
        rounds=[
            OrderRound(
                id="1",
                created=datetime(2023, 1, 1).timestamp(),
                items=[
                    OrderRoundItem(
                        name="Corona",
                        quantity=2,
                        id="1"
                    )
                ]
            )
        ]
    ),
}
