import { Schema, model } from "mongoose";
const voucherSchema = new Schema({
  name: {
    type: String,
  },
  discountOff: {
    type: Number,
  },
  maxDiscountOff: {
    type: Number,
  },
  content: {
    type: String,
  },
  minOrder: {
    type: Number,
  },
  remainingSlot: {
    type: Number,
  },
  expiredDate: {
    type: Date,
    default: Date.now,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});
voucherSchema.index({ name: "text" });
export const Voucher = model("Voucher", voucherSchema, "Voucher");
