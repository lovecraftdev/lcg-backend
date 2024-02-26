import express from "express";
import { getAllCustomer } from "../Controllers/Customers-Controller.js";

const router = express.Router();

router.get('/getCustomers', getAllCustomer);

export default router;
