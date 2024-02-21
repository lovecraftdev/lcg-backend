import Product from "../Models/ProductModel.js";

//Add Product

export const addProduct = async (req, res) => {
  try {
    const { title, body_html, product_type, handle, vendor, status, price } =
      req.body;

    const existingProduct = await Product.findOne({ handle: handle });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product Already Exists",
      });
    }
    const savedProduct = await Product.create({
      title,
      body_html,
      product_type,
      handle,
      vendor,
      status,
      price,
    });

    res
      .status(201)
      .json({ message: "Product Added Successfully", savedProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
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
  const { page } = req.query;
  const pageSize = 50;

  try {
    const startIndex = (page - 1) * pageSize;

    const paginatedData = await Product.find().skip(startIndex).limit(pageSize);

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
