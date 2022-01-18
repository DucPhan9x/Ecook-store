import { Schema, model } from "mongoose";
import { Reply } from "./ReplyModel";
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
    type: [Reply],
  },
});
export const Feedback = model("Feedback", feedbackSchema, "Feedback");
