import { Schema, model } from "mongoose";
import { videoCourseSchema } from "./VideoCourseModel";
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
  videoList: {
    type: [videoCourseSchema],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
const Course = model("Course", courseSchema, "Course");
export { Course, courseSchema };
