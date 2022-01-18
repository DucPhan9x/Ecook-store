import { Schema, model } from "mongoose";
const foodTypeSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
export const FoodType = model("FoodType", foodTypeSchema, "FoodType");
