import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  alt: {
    type: String,
    default: "alt",
  },
  src: String,
  originalname: String,
  key: String,
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
