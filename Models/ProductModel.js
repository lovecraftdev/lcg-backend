import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    compare_at_price: {
      type: Number,
      required: true,
    },
    inventory_quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [{ type: String }],
});

const imageSchema = new mongoose.Schema({
  alt: { type: String, default: "alt" },
  src: { type: String, default: "alt" },
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
    product_type: {
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
      default: "Draft",
    },
    variants: [variationSchema],
    images: [imageSchema],
    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
