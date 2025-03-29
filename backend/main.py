from fastapi import FastAPI
import uvicorn

app = FastAPI(title="The Bar Manager", version="0.1.0")


@app.get("/health")
def health_check():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
