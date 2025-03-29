from typing import Dict, TypedDict
import uuid

class Product(TypedDict):
    id: int
    name: str
    price: int
    quantity: int

Items = Dict[str, Product]

items: Items = {
    "1": {
        "name": "Corona",
        "price_per_unit": 115,
        "quantity": 2,
        "id": 1
    },
    "2": {
        "name": "Quilmes",
        "price_per_unit": 120,
        "quantity": 0,
        "id": 2
    },
    "3": {
        "name": "Club Colombia",
        "price_per_unit": 110,
        "quantity": 3,
        "id": 3
    }
}


  