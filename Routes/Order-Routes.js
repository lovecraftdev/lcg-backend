import express from "express";
import { createOrder } from "../Controllers/Order-Controller.js";

const router = express.Router();

router.post("/createOrders", createOrder)

export default router
