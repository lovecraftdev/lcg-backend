import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    compare_at_price: Number,
    sku: String,
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
    taxable: {
      type: Boolean,
      default: false,
    },
    weight: Number,
    weight_unit: String,
    inventory_quantity: Number,
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  alt: {
    type: String,
    default: "alt",
  },
  src: String,
  variant_ids: [{ type: String }],
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
