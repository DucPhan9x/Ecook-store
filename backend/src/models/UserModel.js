import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  roleId: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  activeToken: {
    type: String,
  },
});
export const User = model("User", userSchema, "User");
