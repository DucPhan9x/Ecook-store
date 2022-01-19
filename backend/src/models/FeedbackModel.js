import { Schema, model } from "mongoose";
import { replySchema } from "./ReplyModel";
const feedbackSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  numOfStars: {
    type: Number,
  },
  content: {
    type: Number,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  feedbackType: {
    type: Number,
  },
  reply: {
    type: [replySchema],
  },
});
export const Feedback = model("Feedback", feedbackSchema, "Feedback");
