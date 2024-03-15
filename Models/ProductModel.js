import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    title: String,
    price: { type: Number, required: true },
    compare_at_price: { type: Number, required: true },
    sku: String,
    barcode: String,

    option1: {
      type: String,
      default: null,
    },
    option2: {
      type: String,
      default: null,
    },
    option3: {
      type: String,
      default: null,
    },
    option4: {
      type: String,
      default: null,
    },
    weight: Number,
    weight_unit: {
      type: String,
      default: "kg",
    },
    inventory_quantity: Number,
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  alt: {
    type: String,
    default: "alt",
  },
  src: String,
});

const optionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  values: [
    {
      id: Number,
      value: String,
    },
  ],
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    body_html: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: null,
    },
    comparePrice: {
      type: Number,
      default: null,
    },
    available: {
      type: Number,
      default: null,
    },
    sku: {
      type: String,
      default: null,
    },
    barcode: {
      type: String,
      default: null,
    },
    weight: {
      type: Number,
      default: null,
    },
    weight_unit: {
      type: String,
      default: "kg",
    },
    product_type: {
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
    options: [optionSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
