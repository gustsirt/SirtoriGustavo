# my_project/app/routes/items.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/items/")
async def read_items():
    return [{"item_id": "Foo"}, {"item_id": "Bar"}]