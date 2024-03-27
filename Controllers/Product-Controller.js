import Product from "../Models/ProductModel.js";
import Image from "../Models/image.model.js";

//Add Product
export const addProduct = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      body_html,
      handle,
      variants,
      options,
      price,
      comparePrice,
      available,
      sku,
      barcode,
      weight,
      status,
      productCategory,
      product_type,
      tags,
      collections,
      vendor,
      tax,
    } = req.body;

    // Check if the product handle already exist
    const existingProduct = await Product.findOne({ handle });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        error: "Product handle already exists. Please use a different handle.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No files uploaded. Please provide at least one file.",
      });
    }

    const mediaUrls = await Promise.all(
      req.files.map(async (file) => ({
        src: file.location,
        alt: `${title} | Love Craft Gifts`,
      }))
    );

    const product = await Product.create({
      title,
      body_html,
      handle,
      price,
      comparePrice,
      available,
      sku,
      barcode,
      weight,
      status,
      productCategory,
      product_type,
      tags,
      collections,
      vendor,
      tax,
      options: JSON.parse(options),
      variants: JSON.parse(variants),
      images: mediaUrls,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "ValidationError") {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
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
    const product = await Product.findOne({ _id: id }).populate(
      "variants.imageId"
    );
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

// -----------------------Delete Product-------------------------

export const deleteProduct = async (req, res) => {
  const idsToDelete = req.body.ids;

  try {
    const { deletedCount } = await Product.deleteMany({
      _id: { $in: idsToDelete },
    });

    if (deletedCount > 0) {
      res.status(200).json({ message: "Products deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "No products found with the specified IDs" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Upload Image to Gallery
export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files were uploaded." });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const { originalname, key, location } = file;

      const newImage = new Image({
        originalname,
        key,
        src: location,
      });

      const savedImage = await newImage.save();
      uploadedImages.push(savedImage);
    }

    res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();

    res.status(200).json({
      success: true,
      images: images,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// -----------------------Upload Image To Product-------------------------

export const uploadImageToProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId).setOptions({
      validateBeforeSave: false,
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded." });
    }

    // Create an array to store uploaded image data
    const uploadedImages = [];

    // Handle each uploaded image
    req.files.forEach((file) => {
      const newImage = {
        alt: `${product.title} | Love Craft Gifts`,
        src: file.location,
      };

      // Append the image to the product's images array
      product.images.push(newImage);

      // Add the uploaded image data to the array
      uploadedImages.push(newImage);
    });

    // Save the updated product in the database
    await product.save({ validateBeforeSave: false });

    const newUploadedImages = product.images.filter((image) =>
      uploadedImages.some((uploadedImage) => uploadedImage.src === image.src)
    );

    return res.status(200).json({
      message: "Images uploaded successfully.",
      uploadedImages: newUploadedImages,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

//Delete image from product
export const deleteImagesFromProduct = async (req, res) => {
  const { productId } = req.params;
  const { imageIds } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Remove images with the provided IDs from the product's images array
    product.images = product.images.filter(
      (image) => !imageIds.includes(image._id.toString())
    );

    // Save the updated product in the database
    await product.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ success: true, message: "Images deleted successfully." });
  } catch (error) {
    console.error("Error deleting images:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error." });
  }
};

//Update Product

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  try {
    const {
      title,
      body_html,
      images,
      handle,
      variants,
      options,
      price,
      comparePrice,
      sku,
      barcode,
      available,
      weight,
      status,
      productCategory,
      product_type,
      tags,
      collections,
      vendor,
      tax,
    } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        body_html,
        handle,
        price,
        images,
        comparePrice,
        sku,
        barcode,
        available,
        weight,
        status,
        productCategory,
        product_type,
        tags,
        collections,
        vendor,
        tax,
        options,
        variants,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Product Updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error:", error);

    if (error.name === "ValidationError") {
      res.status(400).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
};
