from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from modules.stock.handlers import get_all_stock
from modules.stock.models import StockResponse

StockRouter = APIRouter(prefix="/stock")

@StockRouter.get("/", response_model=StockResponse)
def get_stock() -> JSONResponse:
    response = get_all_stock()
    return response