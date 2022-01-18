import { Schema, model } from "mongoose";
const userDetailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  gender: {
    type: Boolean,
  },
  address: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});
export const UserDetail = model("UserDetail", userDetailSchema, "UserDetail");
