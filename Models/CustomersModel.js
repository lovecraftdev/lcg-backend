import mongoose from "mongoose";

const addressesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
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
    },
  zip: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
})

const CustomerSchema = new mongoose.Schema({
  // Define your Customer schema fields here
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  addresses: [addressesSchema],
  

},{ timestamps: true });



const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;





