import { Schema, model } from "mongoose";
import { Material } from "./MaterialModel";
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
  },
  material: [Material],
  createAt: {
    type: Date,
    default: Date.now,
  },
  slotQuantity: Number,
});
export const Recipe = model("Recipe", recipeSchema, "Recipe");
