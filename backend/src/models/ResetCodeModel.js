import { Schema, model } from "mongoose";
const resetCodeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  code: {
    type: String,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const ResetCode = model("ResetCode", resetCodeSchema, "ResetCode");
