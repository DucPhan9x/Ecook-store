import { Schema, model } from "mongoose";
const orderItemSchema = new Schema({
  foodId: {
    type: Schema.Types.ObjectId,
  },
  unitPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});
export const OrderItem = model("OrderItem", orderItemSchema, "OrderItem");
