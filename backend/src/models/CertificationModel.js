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
  },
  positionCreate: {
    type: String,
  },
  graded: {
    type: String,
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
