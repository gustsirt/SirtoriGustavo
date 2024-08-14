from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from typing import List

from database import collection

# Crear el router
router = APIRouter()

# Modelo Pydantic para los items
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

# Conversión de ObjectId a string
def item_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "description": item.get("description", ""),
        "price": item["price"],
        "tax": item.get("tax", 0),
    }

@router.post("/", response_model=Item)
async def create_item(item: Item):
    new_item = await collection.insert_one(item.dict())
    created_item = await collection.find_one({"_id": new_item.inserted_id})
    return item_helper(created_item)

#@router.get("/", response_model=List[Item])
@router.get("/")
async def get_items():
    items = []
    async for item in collection.find():
        items.append(item_helper(item))
    return {"message": "Welcome to the API: ITEMS!"}
    # return items

@router.get("/{id}", response_model=Item)
async def get_item(id: str):
    item = await collection.find_one({"_id": ObjectId(id)})
    if item:
        return item_helper(item)
    raise HTTPException(status_code=404, detail="Item not found")

@router.put("/{id}", response_model=Item)
async def update_item(id: str, item: Item):
    updated_item = await collection.update_one({"_id": ObjectId(id)}, {"$set": item.dict()})
    if updated_item.modified_count:
        updated_item = await collection.find_one({"_id": ObjectId(id)})
        return item_helper(updated_item)
    raise HTTPException(status_code=404, detail="Item not found")

@router.delete("/{id}", response_model=Item)
async def delete_item(id: str):
    deleted_item = await collection.find_one_and_delete({"_id": ObjectId(id)})
    if deleted_item:
        return item_helper(deleted_item)
    raise HTTPException(status_code=404, detail="Item not found")
