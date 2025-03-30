from typing import Dict, TypedDict

class Item(TypedDict):
    id: str
    name: str
    price: int
    quantity: int

Items = Dict[str, Item]

items: Items = {
    "1": {
        "name": "Corona",
        "price": 115,
        "quantity": 2,
        "id": "1"
    },
    "2": {
        "name": "Quilmes",
        "price": 120,
        "quantity": 0,
        "id": "2"
    },
    "3": {
        "name": "Club Colombia",
        "price": 110,
        "quantity": 3,
        "id": "3"
    }
}


  