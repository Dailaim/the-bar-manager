import uuid
from database.orders import orders, Orders, OrderRound, OrderRoundItem, OrderItem, Order
from database.items import Item, Items
from modules.orders.models import CreateOrder, PricesOrder, CreateRound
from modules.stock.services import get_item
from datetime import datetime
from constants.taxes import taxes
from typing import List
from fastapi import HTTPException

def get_orders() -> Orders:
    return orders.copy()

def get_order_by_id(order_id: str) -> Order:
    order = orders.get(order_id)
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
  
def items_for_rounds(rounds: List[OrderRound]) ->  List[OrderItem]:
    items: Items = {}
    for round in rounds:
        for item in round.get("items", []):
            id = item.get("id", None)
            itemDatabase = get_item(id)
            if id in items:
                items[id].update(quantity=items[id]["quantity"] + item["quantity"])
            else:
                items[id] = itemDatabase
                items[id]["quantity"] = item["quantity"]
                
    items_list = []
    for item_id in items:
        item = items[item_id]
        order_item = OrderItem(
            name= item["name"],
            quantity=item["quantity"],
            total=item["price"] * item["quantity"],
            price_per_unit=item["price"],
            id=item_id
        )
        items_list.append(order_item)
        
    return items_list
      
def price_for_items(items: List[OrderItem]) -> PricesOrder:
    subtotal = 0
    for item in items:
        subtotal += item["price_per_unit"] * item["quantity"]
    taxes_total = subtotal * taxes / 100
    total = subtotal + taxes_total
    
    return PricesOrder(
        subtotal=subtotal,
        taxes=taxes_total,
        total=total,
        discounts=0
    )

def create_order(order: CreateOrder) -> Orders:
    order_id = str(uuid.uuid4())

    rounds: List[OrderRound] = []

    rounds.append(
      OrderRound(
        created=datetime.now(),
        id=str(uuid.uuid4()),
        items=order.round
      )
    )
    
    items = items_for_rounds(rounds)
        
    prices = price_for_items(items)
        
    new_order = Order(
        created= datetime.now(),
        paid= False,
        subtotal= prices.subtotal,
        taxes= prices.taxes,
        total= prices.total,
        items= items,
        rounds= rounds,
        discounts= 0,
        id=order_id
    )
    orders[order_id] = new_order
    return new_order
  
def delete_order(order_id: str) -> None:
    del orders[order_id]
    return None
  
def add_round(order_id: str, round: CreateRound) -> Order:
    if len(round.items) == 0:
        raise HTTPException(status_code=400, detail="Round cannot be empty")
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    round_id = str(uuid.uuid4())
    rounds.append(OrderRound(id=round_id, items=round.items, created=datetime.now()))
    items = items_for_rounds(rounds)
    prices = price_for_items(items)
    order.update(subtotal=prices.subtotal, taxes=prices.taxes, total=prices.total, rounds=rounds, items=items)
    orders[order_id] = order
    return order
  
def remove_round(order_id: str, round_id: str) -> Order:
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    round : OrderRound = None
    for i, r in  enumerate(rounds):
        if str(r["id"]) == str(round_id):
            rounds.pop(i)
            round = r
            break
      
    if round is None:
        raise HTTPException(status_code=404, detail="Round not found")
    
    if len(rounds) == 0:
        del orders[order_id]
        return None
      
    items = items_for_rounds(rounds)
    prices = price_for_items(order.items)
    order.update(rounds=rounds, items=items, subtotal=prices.subtotal, taxes=prices.taxes, total=prices.total)
    orders[order_id] = order
    return order


def update_round(order_id: str, round_id: str, round: CreateRound) -> Order:
    if len(round.items) == 0:
        raise HTTPException(status_code=400, detail="Round cannot be empty")
    
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    _round: OrderRound = None
    for i, r in  enumerate(rounds):
        if str(r["id"]) == str(round_id):
            rounds[i]["items"] = round.items
            _round = r
            break
          
    if _round is None:
        raise HTTPException(status_code=404, detail="Round not found")
    
    items = items_for_rounds(rounds)
    prices = price_for_items(items)

    order.update(rounds=rounds, items=items, subtotal=prices.subtotal, taxes=prices.taxes, total=prices.total)
    
    orders[order_id] = order
    return order
  
def pay_order(order_id: str) -> Order:
    order = get_order_by_id(order_id)
    order.update(paid=True)
    orders[order_id] = order
    return order