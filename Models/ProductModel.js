import mongoose from "mongoose";

const variationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    compare_at_price: {
      type: Number,
      // required: true,
    },
    sku: {
      type: String,
      // required: true,
    },
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
    weight: {
      type: Number,
      // required: true,
    },
    weight_unit: {
      type: String,
      // required: true,
    },
    inventory_quantity: {
      type: Number,
      // required: true,
    },
    // requires_shipping: {
    //   type: Boolean,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema({
  alt: { type: String, default: "alt" },
  src: { type: String },
  variant_ids: [
    {
      type: String,
    },
  ],
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
