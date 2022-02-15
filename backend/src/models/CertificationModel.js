import { Schema, model } from "mongoose";
const certificationSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
  },
  studentId: {
    type: Schema.Types.ObjectId,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  positionCreate: {
    type: String,
  },
  graded: {
    type: String,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const Certification = model(
  "Certification",
  certificationSchema,
  "Certification"
);
