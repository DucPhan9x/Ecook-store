import { Schema, model } from "mongoose";
const userDetailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});
export const UserDetail = model("UserDetail", userDetailSchema, "UserDetail");
