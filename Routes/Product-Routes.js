import { addProduct } from "../Controllers/Product-Controller.js";
import express from "express";

const router = express.Router();

router.post("/add-product", addProduct);

export default router;
