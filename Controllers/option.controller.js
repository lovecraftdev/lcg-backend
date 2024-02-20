import Product from "../Models/ProductModel.js";
import Option from "../Models/options.model.js";

//Controller to create new Option

export const addOption = async (req, res) => {
  try {
    const { name, values } = req.body;
    const existingOption = await Option.findOne({ name });

    if (existingOption) {
      return res.status(400).json({
        success: false,
        message: "Option Already Exists",
      });
    }

    const savedOption = await Option.create({ name, values });

    res.status(201).json({ message: "Option Added Successfully", savedOption });
  } catch (error) {
    console.error("Error adding option:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to add options to multiple products in bulk
export const addOptionsToProducts = async (req, res) => {
  try {
    const { productIds, optionId } = req.body;

    // Find the option
    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    // Update each product with the new option
    const updatePromises = productIds.map(async (productId) => {
      const product = await Product.findById(productId);

      if (product) {
        product.options.push(optionId);
        await product.save();
      }
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: "Options added to products successfully" });
  } catch (error) {
    console.error("Error adding options to products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
