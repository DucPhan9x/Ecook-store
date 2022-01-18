import { Schema, model } from "mongoose";
const paymentCodeSchema = new Schema({
  expired: {
    type: Boolean,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
  },
});
export const PaymentCode = model(
  "PaymentCode",
  paymentCodeSchema,
  "PaymentCode"
);
