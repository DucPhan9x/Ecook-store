import { Schema, model } from "mongoose";
import { Course } from "./CourseModel";
const videoCourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});
export const VideoCourse = model(
  "VideoCourse",
  videoCourseSchema,
  "VideoCourse"
);
