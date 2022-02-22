import { Schema, model } from "mongoose";
const orderItemSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
  },
  unitPrice: {
    type: Number, // store  to when changed unitPrice item it's not effect
  },
  quantity: {
    type: Number,
  },
  orderType: {
    type: Number, // 1 food, 2 course
  },
});
const OrderItem = model("OrderItem", orderItemSchema, "OrderItem");

export { orderItemSchema, OrderItem };
