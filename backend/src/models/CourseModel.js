import { Schema, model } from "mongoose";
import { VideoCourse } from "./VideoCourseModel";
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  discountOff: {
    type: Number,
    required: true,
  },
  discountMaximum: {
    type: Number,
    required: true,
  },
  instructorId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  numOfStars: {
    type: Number,
  },
  videoList: [VideoCourse],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const Course = model("Course", courseSchema, "Course");
