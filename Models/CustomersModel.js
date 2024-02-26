import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  // Define your Customer schema fields here
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;





