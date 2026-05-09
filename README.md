<h1 align="center">💳 PayVerse</h1>

<p align="center">
  Secure Full-Stack Razorpay Payment Gateway
</p>

<p align="center">
  Built with FastAPI • React • MongoDB • Razorpay
</p>

PayVerse — Secure Full-Stack Razorpay Payment Gateway
A modern full-stack payment gateway platform built using FastAPI, React, MongoDB, and Razorpay.
PayFlux demonstrates secure Razorpay payment integration, dynamic pricing plans, payment verification using HMAC SHA256 signature validation, MongoDB transaction storage, and production-ready deployment.
________________________________________
<p align="center">

<img src="https://img.shields.io/badge/FastAPI-Backend-green?style=for-the-badge" />

<img src="https://img.shields.io/badge/React-Frontend-blue?style=for-the-badge" />

<img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge" />

<img src="https://img.shields.io/badge/Razorpay-PaymentGateway-blueviolet?style=for-the-badge" />

<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

</p>
# 📚 Table of Contents

- Features
- Tech Stack
- Architecture
- Screenshots
- Backend Setup
- Frontend Setup
- API Endpoints
- Deployment
- Security Features
- Future Improvements
- Author
# ✨ Features

| Feature | Description |
|---|---|
| 🔐 Secure Payments | HMAC SHA256 verification |
| 💳 Razorpay Integration | Real-time payment processing |
| 📊 Dashboard UI | Dynamic subscription dashboard |
| ⚡ FastAPI Backend | High-performance REST APIs |
| 🗄 MongoDB Storage | Persistent transaction storage |
| 🚀 Deployment Ready | Render + Vercel |
________________________________________
Tech Stack
```text
Frontend
•	React
•	Vite
•	Axios
•	Lucide React Icons
•	CSS3
Backend
•	FastAPI
•	Razorpay API
•	Pydantic
•	Uvicorn
•	Python-dotenv
Database
•	MongoDB Atlas
•	PyMongo
Deployment
•	Render (Backend)
•	Vercel (Frontend)
```
________________________________________
# 🏗 Architecture

```text
┌─────────────────────┐
│  React Frontend     │
│      (Vercel)       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│  FastAPI Backend    │
│      (Render)       │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│   MongoDB Atlas     │
└─────────┬───────────┘
          ↓
┌─────────────────────┐
│    Razorpay API     │
└─────────────────────┘
```
________________________________________
#Folder Structure
```text
payment-gateway/
│
├── backend/
│ ├── app/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── database/
│ │ ├── schemas/
│ │ └── utils/
│ │
│ ├── main.py
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── README.md
________________________________________
```
# 📸 Screenshots

## Dashboard UI

<img width="1600" height="899" alt="WhatsApp Image 2026-05-09 at 2 11 23 PM" src="https://github.com/user-attachments/assets/8c77c25b-035e-48ea-a812-b9b22e03e3ca" />


## Razorpay Checkout

<img width="1600" height="899" alt="WhatsApp Image 2026-05-09 at 2 11 23 PM" src="https://github.com/user-attachments/assets/af479dd5-c5dc-4d36-b04a-104869c43616" />

<img width="1600" height="899" alt="WhatsApp Image 2026-05-09 at 2 12 06 PM" src="https://github.com/user-attachments/assets/82f0e6a5-ac8b-468d-8b14-c7a6ae0e4d07" />


## MongoDB Transactions

<img width="1600" height="846" alt="WhatsApp Image 2026-05-09 at 2 10 40 PM" src="https://github.com/user-attachments/assets/61d1f46c-acaa-4276-a026-0856adf4dcdf" />

# 📽️ Demo Video


________________________________________
#Backend Setup
Clone Repository
```text
git clone https://github.com/your-username/payVerse.git
```
________________________________________
#Navigate to Backend
```text
cd backend
```
________________________________________
#Create Virtual Environment
Windows
```text
python -m venv venv
venv\Scripts\activate
```
Linux/Mac
```text
python3 -m venv venv
source venv/bin/activate
```
________________________________________
#Install Dependencies
```text
pip install -r requirements.txt
```
________________________________________
#Environment Variables
```text
Create a .env file inside backend.
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
MONGO_URL=your_mongodb_connection_url
```
________________________________________
#Run Backend Server
```text
uvicorn main:app --reload
Server runs at:
http://127.0.0.1:8000
```
________________________________________
#Frontend Setup
Navigate to Frontend
```text
cd frontend
```
________________________________________
#Install Dependencies
```text
npm install
```
________________________________________
#Run Frontend
```text
npm run dev
```
Frontend runs at:
```text
http://localhost:5173
```
________________________________________
#API Endpoints
```text
Health Check
GET /
Returns API status.
```
________________________________________
#Create Payment Order

POST /create-order
Creates Razorpay payment order.
```text
Request Body
{
"amount": 1499,
"currency": "INR",
"receipt": "receipt_001"
}
Response
{
"order_id": "order_xxxxx",
"amount": 149900,
"currency": "INR",
"status": "created"
}
```
________________________________________
#Verify Payment

POST /verify-payment
Verifies Razorpay payment securely.
```text
Request Body
{
"razorpay_order_id": "order_xxxxx",
"razorpay_payment_id": "pay_xxxxx",
"razorpay_signature": "signature_here"
}
Response
{
"status": "success",
"message": "Payment verified successfully"
}
```
________________________________________
#Fetch Payment Details
```text
GET /payment/{payment_id}
Returns payment details from Razorpay.
```
________________________________________
#Security Features
```text
•	HMAC SHA256 Signature Verification
•	Secure Razorpay Authentication
•	Environment Variable Protection
•	Secure API Architecture
•	Payment Fraud Prevention
•	CORS Middleware Protection
```
________________________________________
#Deployment
```text
Backend Deployment — Render
•	Push backend to GitHub
•	Create Render Web Service
•	Set Root Directory as backend
•	Add Environment Variables
•	Use Start Command:
uvicorn main:app --host 0.0.0.0 --port 10000
```
________________________________________
#Frontend Deployment — Vercel
```text
•	Import GitHub repository
•	Set Root Directory as frontend
•	Deploy React frontend
```
________________________________________
#Razorpay Test Card
```text
Use this test card during development.
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
OTP: 1234
```
________________________________________
#Future Improvements
```text
•	JWT Authentication
•	User Dashboard
•	Admin Analytics Panel
•	Transaction History
•	PDF Invoice Generation
•	Email Notifications
•	Subscription Billing
•	Dark Mode UI
•	Payment History Filters
```
________________________________________
Resume Project Description
Developed and deployed a secure full-stack payment gateway platform using FastAPI, React, MongoDB Atlas, and Razorpay. Implemented payment order creation, HMAC SHA256 payment verification, dynamic pricing dashboard, RESTful APIs, and production deployment using Render and Vercel.
________________________________________
# 🎯 Why This Project?

This project demonstrates real-world payment gateway integration using modern full-stack technologies and secure backend architecture commonly used in production fintech applications.
________________________________________
Author
Akshith
```text
•	GitHub: https://github.com/AvunuriAkshith/
•	LinkedIn: https://linkedin.com/in/avunuriakshith
```
________________________________________
# 🤝 Contributing

Contributions are welcome.

Fork the repository and submit a pull request.
________________________________________
License
This project is licensed under the MIT License.

