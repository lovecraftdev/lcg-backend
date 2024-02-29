import Product from "../Models/ProductModel.js";
import s3Upload from '../Middleware/s3aws.js'; 


//Add Product
 export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      comparePrice,
      status,
      productCategory,
      productType,
      tags,
      collections,
      vendor,
      tax,
    } = req.body;

     // Handle the uploaded files (in req.files)
     const mediaUrls = await Promise.all(
      req.files.map(async (file) => {
        return file.location; // Assuming 'location' is provided by multer-s3
      })
    );

     // Here, you can save the product data and mediaUrls to your database or perform any desired actions

    // Respond with success message or any other data
    res.json({ success: true, message: 'Product added successfully', mediaUrls });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



//Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().limit(20);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Get By ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).populate("options");
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Add Variant to Product

//get products pagination
export const getProductByPagination = async (req, res) => {
  const { page, perPage } = req.query;

  try {
    const startIndex = (page - 1) * perPage;

    const paginatedData = await Product.find()
      .sort({ title: 1 })
      .skip(startIndex)
      .limit(perPage);

    res.json(paginatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//Get Product with options
export const getProductWithOptions = async (req, res) => {
  try {
    const productId = req.params.productId;

    const productWithPopulatedOptions = await Product.findById(
      productId
    ).populate("options");

    if (!productWithPopulatedOptions) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: productWithPopulatedOptions,
    });
  } catch (error) {
    console.error("Error fetching product with options:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Search for products
export const searchProduct = async (req, res) => {
  try {
    const searchTerm = req.query.search;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({ error: "Invalid search term" });
    }

    const searchResults = await Product.find({
      title: new RegExp(searchTerm, "i"),
    });

    res.json(searchResults);
  } catch (error) {
    console.error("Error in searchProduct controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

