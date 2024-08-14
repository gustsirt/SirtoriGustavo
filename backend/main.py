from fastapi import FastAPI
from backend.routes.users import router as items_router

app = FastAPI()

# Incluir las rutas del router de items
app.include_router(items_router, prefix="/users", tags=["users"])

@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}



# pip install fastapi[standard] uvicorn[standard]

# Iniciar el servidor con `uvicorn main:app --reload`
# fastapi dev main.py
# python -m uvicorn main:app --reload


# pip freeze > requirements.txt
# pip install -r requirements.txt

#Insight Devs