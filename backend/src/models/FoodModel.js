import { Schema, model } from "mongoose";
const foodSchema = new Schema({
  typeId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  discountOff: {
    type: Number,
    required: true,
  },
  numOfStars: {
    type: Number,
  },
  discountMaximum: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  isRemoveTemp: {
    type: Boolean,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const Food = model("Food", foodSchema, "Food");
