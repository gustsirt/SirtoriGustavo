from fastapi import FastAPI, Depends
from app.routes import items
from app.dependencies import common_dependency

app = FastAPI()

# Incluir routers con la dependencia común
app.include_router(items.router, prefix="/api/v1", dependencies=[Depends(common_dependency)])

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}

# python -m uvicorn main:app --reload
