from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

import razorpay
import os
import hmac
import hashlib
import logging

# Load environment variables
load_dotenv()

# FastAPI app
app = FastAPI()

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Razorpay credentials
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

# Razorpay client
client = razorpay.Client(
    auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schemas
class OrderRequest(BaseModel):
    amount: int
    currency: str
    receipt: str

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

# Home route
@app.get("/")
def home():
    return {
        "message": "Razorpay Payment API is running 🚀"
    }

# Create order
@app.post("/create-order")
def create_order(order: OrderRequest):

    try:
        payment = client.order.create({
            "amount": order.amount * 100,
            "currency": order.currency,
            "receipt": order.receipt
        })

        logger.info("Order Created Successfully")

        return {
            "order_id": payment["id"],
            "amount": payment["amount"],
            "currency": payment["currency"],
            "status": payment["status"]
        }

    except Exception as e:
        logger.error(str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# Verify payment
@app.post("/verify-payment")
def verify_payment(data: VerifyPaymentRequest):

    generated_signature = hmac.new(
        bytes(RAZORPAY_KEY_SECRET, 'utf-8'),
        bytes(
            f"{data.razorpay_order_id}|{data.razorpay_payment_id}",
            'utf-8'
        ),
        hashlib.sha256
    ).hexdigest()

    if generated_signature == data.razorpay_signature:

        logger.info("Payment Verified")

        return {
            "status": "success",
            "message": "Payment verified successfully"
        }

    logger.error("Payment Verification Failed")

    raise HTTPException(
        status_code=400,
        detail="Invalid payment signature"
    )

# Fetch payment details
@app.get("/payment/{payment_id}")
def get_payment(payment_id: str):

    try:
        payment = client.payment.fetch(payment_id)
        return payment

    except Exception as e:
        logger.error(str(e))
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# Webhook
@app.post("/webhook")
async def webhook(request: Request):

    body = await request.body()

    logger.info(f"Webhook received: {body}")

    return {
        "status": "ok"
    }