import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // required: true,
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sku: { type: String, required: true },
  },
  { timestamps: true }
);

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [{ type: String }],
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const imageSchema = new mongoose.Schema({
  src: {},
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body_html: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    images: [imageSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
