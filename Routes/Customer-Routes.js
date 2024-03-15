import express from "express";
import {
  addCustomer,
  getAllCustomer,
  getCustomersByPagination,
} from "../Controllers/Customers-Controller.js";

const router = express.Router();

// router.get("/getCustomers", getAllCustomer);
router.post("/addCustomer", addCustomer);
router.get("/getCustomers", getCustomersByPagination);

export default router;
