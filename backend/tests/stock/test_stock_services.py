import uuid
import pytest
from unittest.mock import patch
from database.items import Item, items
from modules.stock.models import ItemUpdate
from modules.stock.services import create_item, get_items, get_item, update_item, delete_item
from fastapi import HTTPException

@pytest.fixture
def mock_item():
    return Item(id=uuid.uuid4().hex, name="Test Item", price=100, quantity=50)
  
@pytest.fixture(autouse=True)
def reset_items():
    items.clear()

@patch("database.items.items", {})
def test_create_item():
    new_item = create_item("Test Item", 100, 50)
    assert new_item["name"] == "Test Item"
    assert new_item["price"] == 100
    assert new_item["quantity"] == 50
    assert new_item["id"] in items

@patch("database.items.items", {})
def test_get_items(mock_item):
    items[mock_item["id"]] = mock_item
    retrieved_items = get_items()
    assert len(retrieved_items) == 1
    assert retrieved_items[mock_item["id"]]["name"] == "Test Item"

@patch("database.items.items", {})
def test_get_item(mock_item):
    items[mock_item["id"]] = mock_item
    retrieved_item = get_item(mock_item["id"])
    assert retrieved_item["id"] == mock_item["id"]
    assert retrieved_item["name"] == "Test Item"

@patch("database.items.items", {})
def test_get_item_not_found():
    with pytest.raises(HTTPException) as exc:
        get_item("non_existent_id")
    assert exc.value.status_code == 404
    assert exc.value.detail == "Item not found"

@patch("database.items.items", {})
def test_update_item(mock_item):
    items[mock_item["id"]] = mock_item
    update_data = ItemUpdate(name="Updated Item", price=150, quantity=30)
    updated_item = update_item(mock_item["id"], update_data)
    assert updated_item["name"] == "Updated Item"
    assert updated_item["price"] == 150
    assert updated_item["quantity"] == 30

@patch("database.items.items", {})
def test_delete_item(mock_item):
    items[mock_item["id"]] = mock_item
    delete_item(mock_item["id"])
    assert mock_item["id"] not in items