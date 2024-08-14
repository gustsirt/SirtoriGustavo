import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Cargar variables de entorno desde el archivo .env
load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS")
DATABASE_NAME = os.getenv("DATABASE_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")

# Configurar la conexión a MongoDB
client = AsyncIOMotorClient(MONGO_DETAILS)
database = client[DATABASE_NAME]
collection = database[COLLECTION_NAME]