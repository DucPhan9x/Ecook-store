import { Schema, model } from "mongoose";
import { orderItemSchema } from "./OrderItemModel";

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
  },
  employeeId: {
    type: Schema.Types.ObjectId,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  deliveryAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },
  statusId: {
    type: Number,
    default: 1,
  },
  isPaid: {
    type: Boolean,
  },
  paymentMethod: {
    type: String,
  },
  shipmentFee: {
    type: Number,
  },
  merchandiseSubtotal: {
    type: Number,
  },
  total: {
    type: Number,
  },
  items: {
    type: [orderItemSchema],
  },
  voucherId: {
    type: Schema.Types.ObjectId,
  },
});
export const Order = model("Order", orderSchema, "Order");
