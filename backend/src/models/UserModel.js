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
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  activeToken: {
    type: String,
  },
});
export const User = model("User", userSchema, "User");
