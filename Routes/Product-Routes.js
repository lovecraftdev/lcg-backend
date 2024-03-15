import {
  addProduct,
  deleteImagesFromProduct,
  deleteProduct,
  getAllProducts,
  getImages,
  getProductById,
  getProductByPagination,
  searchProduct,
  updateProduct,
  uploadImage,
  uploadImageToProduct,
} from "../Controllers/Product-Controller.js";

import express from "express";
import s3Upload from "../Middleware/s3aws.js";

const router = express.Router();

router.post("/add-product", s3Upload.array("media"), addProduct);

router.post("/upload", s3Upload.array("media"), uploadImage);

router.post(
  "/upload/:productId",
  s3Upload.array("media"),
  uploadImageToProduct
);

router.post("/delete/:productId", deleteImagesFromProduct);

router.get("/images", getImages);

router.get("/allProducts", getAllProducts);

router.get("/getProduct/:id", getProductById);

router.get("/getProducts", getProductByPagination);

router.get("/searchProduct", searchProduct);

router.delete("/deleteProduct", deleteProduct);

router.put("/updateProduct/:id", updateProduct);

export default router;
