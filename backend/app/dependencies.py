# my_project/app/dependencies.py
from fastapi import Depends, HTTPException

async def common_dependency():
    return "common_dependency_value"

def get_token_header():
    raise HTTPException(status_code=400, detail="X-Token header invalid")