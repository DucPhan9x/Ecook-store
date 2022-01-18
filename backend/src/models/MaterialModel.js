import { Schema, model } from "mongoose";
const materialSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  quantity: Number,
});
export const Material = model("Material", materialSchema, "Material");
