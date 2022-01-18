import { Schema, model } from "mongoose";
const examinationSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
  },
  studentId: {
    type: Schema.Types.ObjectId,
  },
  content: {
    type: String,
  },
  regulation: {
    type: String,
  },
  criteria: {
    type: String,
  },
  videoUrlSubmit: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  isPass: {
    type: Boolean,
  },
  evaluate: {
    type: String,
  },
  feedbacks: {
    type: String,
  },
});
export const Examination = model(
  "Examination",
  examinationSchema,
  "Examination"
);
