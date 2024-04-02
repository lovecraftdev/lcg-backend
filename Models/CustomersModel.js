import mongoose from "mongoose";

const addressesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
  },
  address1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
  zip: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const CustomerSchema = new mongoose.Schema(
  {
    // Define your Customer schema fields here
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    orders_count: {
      type: Number,
      default: 0,
    },
    total_spent: {
      type: Number,
      default: 0,
    },
    addresses: [addressesSchema],
    default_address: addressesSchema,
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
