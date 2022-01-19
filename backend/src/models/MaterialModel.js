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
const Material = model("Material", materialSchema, "Material");
export { Material, materialSchema };
