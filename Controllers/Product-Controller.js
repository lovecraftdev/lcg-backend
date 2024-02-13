// image,
// image,
// handle,
// handle,
import Product from "../Models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      comparePrice,
      chargeTax,
      productCategory,
      productType,
      vendor,
      tags,
    } = req.body;

    const savedProduct = await Product.create({
      title,
      description,
      price,
      category,
      comparePrice,
      chargeTax,
      productCategory,
      productType,
      vendor,
      tags,
    });

    res
      .status(201)
      .json({ message: "Product Added Successfully", savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addVariantToProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { size, color, stock } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const newVariant = {
      size,
      color,
      stock,
    };

    product.variants.push(newVariant);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Variant added to the product",
      product,
    });
  } catch (error) {
    console.error("Error adding variant:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
