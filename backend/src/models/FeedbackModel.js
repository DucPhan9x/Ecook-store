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
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  feedbackType: {
    type: Number, // 1 food, 2 recipe, 3 course
  },
  reply: {
    type: [replySchema],
    default: [],
  },
});
export const Feedback = model("Feedback", feedbackSchema, "Feedback");
