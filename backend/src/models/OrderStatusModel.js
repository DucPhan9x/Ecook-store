import { Schema, model } from "mongoose";
const orderStatusSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
export const OrderStatus = model(
  "OrderStatus",
  orderStatusSchema,
  "OrderStatus"
);
