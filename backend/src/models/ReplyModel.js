import { Schema, model } from "mongoose";
const replySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  feedbackId: {
    type: Schema.Types.ObjectId,
  },
  content: {
    type: String,
  },
});
export const Reply = model("Reply", replySchema, "Reply");
