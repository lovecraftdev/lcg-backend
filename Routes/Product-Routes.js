import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByPagination,
  getProductWithOptions,
  searchProduct,
} from "../Controllers/Product-Controller.js";

import express from "express";
import s3Upload from "../Middleware/s3aws.js";

const router = express.Router();

router.post("/add-product", s3Upload.array('media'), addProduct);

router.get("/allProducts", getAllProducts);

router.get("/getProduct/:id", getProductById);

router.get("/getProducts", getProductByPagination);

router.get("/single-product/:productId", getProductWithOptions);

router.get("/searchProduct", searchProduct);

router.delete("/deleteProduct", deleteProduct);


export default router;
