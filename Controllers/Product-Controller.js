import Product from "../Models/ProductModel.js";

export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      media,
      category,
      type,
      price,
      manufacturingPrice,
      weight,
      volumetricWeight,
      tags,
      chargeTax,
      published,
    } = req.body;

    // Create a new product instance using the Product model
    const newProduct = new Product({
      title,
      description,
      media,
      category,
      type,
      price,
      manufacturingPrice,
      weight,
      volumetricWeight,
      tags,
      chargeTax,
      published,
    });

    // Save the product to the database
    await newProduct.save();

    // Send a success response
    res
      .status(201)
      .json({
        success: true,
        message: "Product added successfully",
        product: newProduct,
      });
  } catch (error) {
    // Handle any errors and send an error response
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
