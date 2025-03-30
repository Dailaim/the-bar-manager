import uuid
import pytest
from unittest.mock import patch
from modules.orders.services import (
    create_order,
    get_order_by_id,
    add_round,
    remove_round,
    update_stock,
    pay_order,
)
from modules.orders.models import CreateOrder, CreateRound
from database.orders import orders, Order, OrderItem, OrderRound, OrderRoundItem
from database.items import Item, items
from fastapi import HTTPException
from constants.taxes import taxes
from datetime import datetime


@pytest.fixture
def mock_item() -> Item:
    return Item(
        id="item1",
        name="Test Item",
        price=10.0,
        quantity=95
    )

@pytest.fixture
def mock_item2() -> Item:
    return Item(
        id="item2",
        name="Test Item",
        price=10.0,
        quantity=95
    )


@pytest.fixture
def mock_create_order() -> CreateOrder:
    return CreateOrder(round=[{"id": "item1", "quantity": 2, "name": "Test Item"}])

@pytest.fixture
def mock_create_round() -> CreateRound:
    return CreateRound(items=[{"id": "item2", "quantity": 3, "name": "Test Item"}])

@pytest.fixture(autouse=True)
def reset_items():
    items.clear()

@pytest.fixture(autouse=True)
def reset_orders():
    orders.clear()
    

@pytest.fixture
def mock_order() -> Order:
    return Order(
        created=datetime.now(),
        paid=False,
        subtotal=115 * 2,
        total=(115 * 2 * taxes / 100) + (115 * 2),
        taxes=115 * 2 * taxes / 100,
        discounts=0,
        id="1",
        items=[
            OrderItem(
                name="Test Item",
                quantity=2,
                total=115 * 2,
                price_per_unit=115,
                id="item1"
            )
          ], 
        rounds=[
            OrderRound(
                id="1",
                created=datetime.now(),
                items=[
                    OrderRoundItem(
                        name="Test Item",
                        quantity=2,
                        id="item1"
                    )
                ]
            )
        ]
    )

@pytest.fixture
def mock_order_2() -> Order:
    return Order(
        created=datetime.now(),
        paid=False,
        subtotal=115 * 2,
        total=(115 * 2 * taxes / 100) + (115 * 2),
        taxes=115 * 2 * taxes / 100,
        discounts=0,
        id="1",
        items=[
            OrderItem(
                name="Test Item",
                quantity=2,
                total=115 * 2,
                price_per_unit=115,
                id="item1"
            )
          ], 
        rounds=[
            OrderRound(
                id="1",
                created=datetime.now(),
                items=[
                    OrderRoundItem(
                        name="Test Item",
                        quantity=1,
                        id="item1"
                    )
                ]
            ),
            OrderRound(
                id="2",
                created=datetime.now(),
                items=[
                    OrderRoundItem(
                        name="Test Item",
                        quantity=1,
                        id="item1"
                    )
                ]
            )
        ]
    )

@patch("database.items.items", {})
def test_create_order(mock_item, mock_create_order):
    items[mock_item["id"]] = mock_item
    order = create_order(mock_create_order)

    assert order is not None
    item = order.get("items", [])[0]
    assert item["id"] == "item1"
    assert item["quantity"] == 2
    assert order["total"] == pytest.approx(22.0)
    assert order["subtotal"] == pytest.approx(20.0)
    assert order["taxes"] == pytest.approx(2.0)

def test_get_order_by_id_not_found():
    with pytest.raises(HTTPException) as exc:
        get_order_by_id(str(uuid.uuid4()))
    assert exc.value.status_code == 404
    assert exc.value.detail == "Order not found"

@patch("database.items.items", {})
@patch("database.orders.orders", {})
def test_add_round_items_0(mock_item, mock_order):
    items[mock_item["id"]] = mock_item
    orders[mock_order["id"]] = mock_order
    
    with pytest.raises(HTTPException) as exc:
        add_round(mock_order["id"], CreateRound(items=[]))
    assert exc.value.status_code == 400
    assert exc.value.detail == "Round cannot be empty"


@patch("database.items.items", {})
def test_get_order_by_id(mock_item, mock_order):
    items[mock_item["id"]] = mock_item
    orders[mock_order["id"]] = mock_order

    order = get_order_by_id(mock_order["id"])

    assert order is not None
    item = order.get("items", [])[0]
    assert item["id"] == "item1"
    assert item["quantity"] == 2
    assert order["total"] == pytest.approx(253.0)
    assert order["subtotal"] == pytest.approx(230.0)
    assert order["taxes"] == pytest.approx(23.0)
    assert order["paid"] is False
    

@patch("database.orders.orders", {})
@patch("database.items.items", {})
def test_add_round(mock_create_round, mock_order, mock_item, mock_item2):
    orders[mock_order["id"]] = mock_order
    items[mock_item["id"]] = mock_item
    items[mock_item2["id"]] = mock_item2
    
    assert len(mock_order.get("rounds", [])) == 1
    updated_order = add_round(mock_order["id"], mock_create_round)

    rounds = updated_order.get("rounds", [])
    itemsOrder = updated_order.get("items", [])
    
    assert len(rounds) == 2
    assert itemsOrder[0]["quantity"] == 2
    assert itemsOrder[0]["id"] == "item1"
    assert itemsOrder[1]["quantity"] == 3
    assert itemsOrder[1]["id"] == "item2"


@patch("database.orders.orders", {})
def test_remove_round(mock_order_2, mock_item):
    orders[mock_order_2["id"]] = mock_order_2
    items[mock_item["id"]] = mock_item
    assert len(mock_order_2.get("rounds", [])) == 2
    
    round_id = mock_order_2.get("rounds", [])[1]["id"]

    updated_order = remove_round(mock_order_2["id"], round_id)
    assert updated_order is not None
    assert len(mock_order_2.get("rounds", [])) == 1
    
    

@patch("database.items.items", {})
def test_update_stock(mock_item):
    items[mock_item["id"]] = mock_item

    orderItem = OrderItem(
        name="Test Item",
        quantity=5,
        total=115 * 5,
        price_per_unit=115,
        id="item1"
    )
    update_stock([orderItem])
    assert items[mock_item["id"]]["quantity"] == 90
    
    update_stock([orderItem], is_reverse=True)
    assert items[mock_item["id"]]["quantity"] == 95

@patch("database.orders.orders", {})
@patch("database.items.items", {})
def test_pay_order(mock_order, mock_item):
    items[mock_item["id"]] = mock_item
    orders[mock_order["id"]] = mock_order

    paid_order = pay_order(mock_order["id"])

    assert paid_order["paid"] is True	
    assert orders[mock_order["id"]]["paid"] is True
