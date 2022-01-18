import { Schema, model } from "mongoose";
const cartItemSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
  },
  itemId: {
    type: Schema.Types.ObjectId,
  },
  itemType: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});
export const CartItem = model("CartItem", cartItemSchema, "CartItem");
