import express from "express";
import {
  addCustomer,
  deleteCustomers,
  getCustomersByPagination,
  searchCustomers,
} from "../Controllers/Customers-Controller.js";

const router = express.Router();

// router.get("/getCustomers", getAllCustomer);
router.post("/addCustomer", addCustomer);
router.get("/getCustomers", getCustomersByPagination);
router.delete("/deleteCustomer" , deleteCustomers);
router.get("/searchCustomer", searchCustomers);


export default router;
