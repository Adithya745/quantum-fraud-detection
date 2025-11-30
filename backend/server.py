from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import random

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# --- MODELS ---

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PredictionRequest(BaseModel):
    amount: float
    time: int
    merchant: str
    location: str
    type: str
    device: str
    daysSince: int
    transactionsToday: int

class PredictionResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    # Input Echo
    amount: float
    merchant: str
    location: str
    
    # Prediction Results
    status: str
    riskScore: int
    isFraud: bool
    classicalConf: int
    quantumConf: int
    agreement: str
    reasons: List[str]

# --- ROUTES ---

@api_router.get("/")
async def root():
    return {"message": "Quantum Fraud Detection API Online"}

@api_router.post("/predict", response_model=PredictionResponse)
async def predict_fraud(input: PredictionRequest):
    # --- QUANTUM-CLASSICAL HYBRID LOGIC SIMULATION ---
    # In a real app, this would call your .pkl models or Qiskit job
    
    risk_score = 10 # Base risk
    reasons = []
    
    # Business Logic
    if input.amount > 1000:
        risk_score += 30
        reasons.append("High transaction amount")
        
    if 0 <= input.time <= 6:
        risk_score += 20
        reasons.append("Unusual time (Late night/Early morning)")
        
    if input.location == 'Abroad':
        risk_score += 35
        reasons.append("Location: Abroad")
    elif input.location == 'High Risk Area':
        risk_score += 40
        reasons.append("Location: High Risk Area")
        
    if input.device == 'ATM' and input.time < 6:
        risk_score += 20
        reasons.append("Late night ATM withdrawal")
        
    if input.daysSince > 30 and input.amount > 500:
        risk_score += 15
        reasons.append("Large amount after dormancy")

    # Cap risk score
    risk_score = min(99, max(1, risk_score))
    
    is_fraud = risk_score > 60
    status = "FRAUD DETECTED" if is_fraud else ("REVIEW NEEDED" if risk_score > 30 else "LEGITIMATE")
    
    # Create response object
    prediction = PredictionResponse(
        amount=input.amount,
        merchant=input.merchant,
        location=input.location,
        status=status,
        riskScore=risk_score,
        isFraud=is_fraud,
        classicalConf=random.randint(85, 99),
        quantumConf=random.randint(75, 95),
        agreement="Models Agree" if random.random() > 0.2 else "Models Diverge",
        reasons=reasons if reasons else ["Normal transaction pattern"]
    )
    
    # SAVE TO MONGODB
    doc = prediction.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.predictions.insert_one(doc)
    
    return prediction

@api_router.get("/history", response_model=List[PredictionResponse])
async def get_history():
    # Fetch last 50 predictions from MongoDB
    cursor = db.predictions.find({}, {"_id": 0}).sort("timestamp", -1).limit(50)
    predictions = await cursor.to_list(length=50)
    
    # Parse timestamps
    results = []
    for p in predictions:
        if isinstance(p.get('timestamp'), str):
            try:
                p['timestamp'] = datetime.fromisoformat(p['timestamp'])
            except:
                pass
        results.append(p)
        
    return results

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
