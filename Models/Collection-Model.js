import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
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
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
