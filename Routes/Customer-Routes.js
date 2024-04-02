import express from "express";
import {
  addCustomer,
  deleteCustomers,
  getCustomer,
  getCustomersByPagination,
  searchCustomers,
  updateCustomerContact,
} from "../Controllers/Customers-Controller.js";

const router = express.Router();

// router.get("/getCustomers", getAllCustomer);
router.post("/addCustomer", addCustomer);
router.get("/getCustomers", getCustomersByPagination);
router.get("/getCustomer/:customerID", getCustomer);
router.put("/update-customer/:customerId", updateCustomerContact);

router.delete("/deleteCustomer", deleteCustomers);
router.get("/searchCustomer", searchCustomers);

export default router;
