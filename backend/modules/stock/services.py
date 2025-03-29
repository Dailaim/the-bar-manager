import uuid
from database.items import Items, Product, items
from modules.stock.models import ProductUpdate


def create_item(name: str, price: int, quantity: int) -> Product:
    newProduct = Product(
        id=uuid.uuid4().hex,
        name=name,
        price=price,
        quantity=quantity
    )
    items[newProduct["id"]] = newProduct
    return newProduct

def get_items() -> Items:
    return items
  
def get_item(item_id: str) -> Product:
    return items[item_id]
  
def update_item(item_id: str, update_data: ProductUpdate) -> dict:
    item = items[item_id]
    if update_data.name is not None:
        item["name"] = update_data.name
    if update_data.price is not None:
        item["price"] = update_data.price
    if update_data.quantity is not None:
        item["quantity"] = update_data.quantity

    return item  
  
def delete_item(item_id: str) -> None:
    del items[item_id]
    return None