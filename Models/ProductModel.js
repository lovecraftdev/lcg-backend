import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: String, required: true },
    sku: { type: String, required: true },
  },
  { timestamps: true }
);

const optionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [{ type: String }],
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    comparePrice: { type: Number, required: true },
    chargeTax: { type: Boolean, default: false },
    productCategory: { type: String, required: true },
    productType: { type: String },
    vendor: { type: String, required: true },
    tags: [String],
    variants: [variationSchema],
    options: [optionSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
