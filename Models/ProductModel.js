import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: [
    {
      url: String,
      altText: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  manufacturingPrice: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  volumetricWeight: {
    type: Number,
  },
  tags: [
    {
      type: String,
    },
  ],
  chargeTax: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
