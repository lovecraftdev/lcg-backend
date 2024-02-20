import { Schema, model } from "mongoose";

const optionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  values: {
    type: [String],
    required: true,
  },
});

const Option = model("Option", optionSchema);

export default Option;
