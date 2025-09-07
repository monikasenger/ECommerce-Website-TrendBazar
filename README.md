# 🛒 Trend Bazar - E-Commerce Web Application

Trend Bazar is a full-stack e-commerce web application built with **React (Frontend)**, **Node.js + Express (Backend)**, and **MongoDB (Database)**.  
It provides essential shopping features like product listing, cart, wishlist, orders, authentication, and payments.

---

## 🚀 Deployment

- **Frontend (Render):** [fontend](https://ecommerce-website-trendbazar.onrender.com)  
- **Backend (Render):** [backend](https://trendbazar.onrender.com)

---


## 🚀 Features

### 👩‍💻 User Features
- 🔑 User Authentication (Register/Login/Logout)
- 👟 Browse Products (Shoes, Phones, Novels, Home Decor, Earbuds, etc.)
- 🛍️ Add to Cart & Wishlist
- 📦 Place Orders
- 💳 Payment Integration (Dummy/Stripe setup)
- 📝 Order History & Tracking
- 🔙 Back Navigation support
- 🔔 Toast Notifications
---

## 🛠️ Tech Stack

| Technology   | Description                      |
|--------------|----------------------------------|
| **Frontend** | React (Vite), Tailwind CSS, Axios |
| **Backend**  |Node.js, Express.js, JWT, bcrypt |
| **Database** | MongoDB with Mongoose            |
| **Deployment** | Render (Frontend & Backend)   |

---

## ⚙️ Environment Variables

Create a `.env` file in both **backend** and **frontend** folders.

### Backend `.env`
```bash

MONGODB_URI ='mongodb+srv://username:passsword@cluster0.sguyk.mongodb.net'
CLOUDINARY_NAME = 'youcloudinaryname'
CLOUDINARY_API_KEY = 'yourcloudinaryapikey'
CLOUDINARY_SECRET_KEY = 'yourcloudinarysecretkry'
ADMIN_EMAIL =''
ADMIN_PASSWORD=''
JWT_SECRET ='yoursecreat'


```
---
### Frontend `.env`
```bash
VITE_BACKEND_URL=http://localhost:4000

```
---

## 💻 Installation Guide  & Setup

### ✅ Prerequisites

- **Node.js installed**  
- **MongoDB URI** (Cloud or Local)

---

### 📦 Clone the Repository
```bash

git clone https://github.com/monikasenger/ECommerce-Website-TrendBazar.git
cd ECommerce-Website-TrendBazar
```
---

### 🔧 Setup Backend:

```bash
cd backend
npm install

▶️ Run the backend:
npm start
http://localhost:4000
```
---
### 💻 Setup Frontend:
```bash
cd frontend
npm install

▶️ Run the frontend:
npm run dev
http://localhost:5173
```
---
## 📁 Folder Structure 
```bash
ECommerce-Webiste-TrendBazar/
│── trendbazaar-backend/              # Express + MongoDB backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # JWT auth middleware
│   └── server.js         # Entry point
│
│── trendbazaar-frontend/             # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # App pages (Login, Register, Home, Admin, etc.)
│   │   ├── context/       # React Context API for global state(Admin, User, Movie )
│   │   └── App.jsx       # Main App
│   └── vite.config.js
│
└── README.md
