import { Schema, model } from "mongoose";
const roleSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
  },
});
export const Role = model("Role", roleSchema, "Role");
