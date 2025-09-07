// routes/orderRoutes.js
import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import auth from "../middlerwares/auth.js";

const orderRoutes = express.Router();

// POST /orders/create
orderRoutes.post("/", auth, createOrder);
orderRoutes.get('/',auth,getOrders);

export default orderRoutes;
