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
    order = orders.get(order_id).copy()
    if order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
  
def items_for_rounds(rounds: List[OrderRoundItem]) ->  List[OrderItem]:
    items: Items = {}
    for round in rounds:
        for item in round.items:
            if item.id in items:
                items[item.id]["quantity"] += item.quantity
            else:
                items[item.id] = item
    items_list = []
    
    for item_id in items:
        item = items[item_id]
        order_item = OrderItem(
            name=item["name"],
            quantity=item["quantity"],
            total=item["price"] * item["quantity"],
            price_per_unit=item["price"],
            id=item_id
        )
        items_list.append(order_item)

    return items
      
def price_for_items(items: List[OrderItem]) -> PricesOrder:
    subtotal = 0
    for item in items:
        subtotal += item.total
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
    items = items_for_rounds(order.rounds)

    rounds: List[OrderRound] = []
    
    for itemsRound in order.round:
        round_id = str(uuid.uuid4())
        rounds.append(
            OrderRound(
                created=datetime.now(),
                id=round_id,
                items=itemsRound
            )
        )
        
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
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    round_id = str(uuid.uuid4())
    rounds.append(OrderRound(id=round_id, items=round.items, created=datetime.now()))
    order.update(rounds=rounds)
    order.items = items_for_rounds(order.rounds)
    prices = price_for_items(order.items)
    order.subtotal = prices.subtotal
    order.taxes = prices.taxes
    order.total = prices.total
    orders[order_id] = order
    return order
  
def remove_round(order_id: str, round_id: str) -> Order:
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    for i, r in  enumerate(rounds):
        if r.id == round_id:
            rounds.pop(i)
            break
    if round is not None:
        # throw error if round is not found
        raise Exception("Round not found")
    order.update(rounds=rounds)
    
    order.items = items_for_rounds(order.rounds)
    prices = price_for_items(order.items)
    order.subtotal = prices.subtotal
    order.taxes = prices.taxes
    order.total = prices.total
    orders[order_id] = order
    return order


def update_round(order_id: str, round_id: str, round: OrderRound) -> Order:
    order = get_order_by_id(order_id)
    rounds = order.get("rounds", [])
    for i, r in  enumerate(rounds):
        if r.id == round_id:
            rounds[i] = round
            break
    if round is not None:
        # throw error if round is not found
        raise Exception("Round not found")
    order.update(rounds=rounds)
    order.items = items_for_rounds(order.rounds)
    prices = price_for_items(order.items)
    order.subtotal = prices.subtotal
    order.taxes = prices.taxes
    order.total = prices.total
    orders[order_id] = order
    return order