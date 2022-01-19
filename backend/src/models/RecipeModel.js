import { Schema, model } from "mongoose";
import { materialSchema } from "./MaterialModel";
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
  },
  material: {
    type: [materialSchema],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  slotQuantity: Number,
});
export const Recipe = model("Recipe", recipeSchema, "Recipe");
