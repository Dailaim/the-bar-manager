from fastapi import FastAPI
import uvicorn
from modules.stock.routes import StockRouter
from modules.orders.routes import OrdersRouter
from scalar_fastapi import get_scalar_api_reference

app = FastAPI(title="The Bar Manager", version="0.1.0")
app.include_router(StockRouter)
app.include_router(OrdersRouter)

@app.get("/health")
def health_check():
    return {"status": "healthy"}
  
@app.get("/new-docs", include_in_schema=False)
async def scalar_html():
    return get_scalar_api_reference(
        openapi_url=app.openapi_url,
        title=app.title,
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
