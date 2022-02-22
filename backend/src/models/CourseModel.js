import { Schema, model } from "mongoose";
import { examinationSchema } from "./ExaminationModel";
import { videoCourseSchema } from "./VideoCourseModel";
const courseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  studentBuyAt: {
    type: Date,
    default: Date.now,
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
    default: 0,
  },
  numOfFeedbacks: {
    type: Number,
    default: 0,
  },
  videoList: {
    type: [videoCourseSchema],
    default: [],
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  examination: {
    type: examinationSchema,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.index({ courseName: "text" });
const Course = model("Course", courseSchema, "Course");
export { Course, courseSchema };
