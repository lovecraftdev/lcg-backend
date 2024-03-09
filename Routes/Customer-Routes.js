import express from "express";
import { addCustomer, getAllCustomer } from "../Controllers/Customers-Controller.js";

const router = express.Router();

router.get('/getCustomers', getAllCustomer);
router.post("/addCustomer", addCustomer)

export default router;
