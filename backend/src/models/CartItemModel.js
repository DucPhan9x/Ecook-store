import { Schema, model } from "mongoose";
const cartItemSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
  },
  itemId: {
    type: Schema.Types.ObjectId,
  },
  itemType: {
    type: Number, // 1 food, 2 course
  },
  quantity: {
    type: Number,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});

export const CartItem = model("CartItem", cartItemSchema, "CartItem");
