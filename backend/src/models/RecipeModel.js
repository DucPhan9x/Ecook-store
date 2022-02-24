import { Schema, model } from "mongoose";
import { materialSchema } from "./MaterialModel";
const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
  },
  materials: {
    type: [materialSchema],
  },
  contents: {
    type: [],
  },
  numOfStars: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  numOfFeedbacks: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  slotQuantity: Number,
  isRemoved: {
    type: Boolean,
    default: false,
  },
});

recipeSchema.index({ name: "text" });
export const Recipe = model("Recipe", recipeSchema, "Recipe");
