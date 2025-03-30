import uuid
from database.items import Items, Item, items
from modules.stock.models import ItemUpdate
from fastapi import HTTPException

def create_item(name: str, price: int, quantity: int) -> Item:
    newItem = Item(
        id=uuid.uuid4().hex,
        name=name,
        price=price,
        quantity=quantity
    )
    items[newItem["id"]] = newItem
    return newItem

def get_items() -> Items:
    return items.copy()
  
def get_item(item_id: str) -> Item:
    item = items.get(str(item_id))
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    
    return item.copy()
  
def update_item(item_id: str, update_data: ItemUpdate) -> Item:
    item = get_item(item_id)
    
    if update_data.name is not None:
       item.update(name=update_data.name)
    if update_data.price is not None:
       item.update(price=update_data.price)
    if update_data.quantity is not None:
       item.update(quantity=update_data.quantity)

    items[item_id] = item
    return item  
  
def delete_item(item_id: str) -> None:
    del items[item_id]
    return None