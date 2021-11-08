import { Schema, model } from "mongoose";
const tokenSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});
export const Token = model("Token", tokenSchema, "Token");
