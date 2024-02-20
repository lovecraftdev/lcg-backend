import {
  addProduct,
  addVariant,
  getAllProducts,
  getProductById,
  getProductByPagination,
  getProductWithOptions,
} from "../Controllers/Product-Controller.js";
import Product from "../Models/ProductModel.js";
import express from "express";

const router = express.Router();

router.post("/add-product", addProduct);

router.get("/allProducts", getAllProducts);

router.get("/getProduct/:id", getProductById);

router.post("/add-variants-options/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { variants, options } = req.body;

    // Update the product with the provided variants and options
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $push: { variants, options } },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error adding variants and options:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addOption", async (req, res) => {
  try {
    const { name, values, productId } = req.body;

    const newOption = new Option({
      name,
      values,
      productId,
    });

    const savedOption = await newOption.save();

    res.status(201).json(savedOption);
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Add Variant
router.post("/addVariant", addVariant);

router.get("/getProducts", getProductByPagination);

router.get("/:productId", getProductWithOptions);

export default router;
