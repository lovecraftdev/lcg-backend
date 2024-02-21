import {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByPagination,
  getProductWithOptions,
} from "../Controllers/Product-Controller.js";
import express from "express";

const router = express.Router();

router.post("/add-product", addProduct);

router.get("/allProducts", getAllProducts);

router.get("/getProduct/:id", getProductById);


router.get("/getProducts", getProductByPagination);

router.get("/:productId", getProductWithOptions);

export default router;
