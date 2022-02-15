import { Schema, model } from "mongoose";
import { testSchema } from "./TestModel";
const examinationSchema = new Schema({
  courseId: {
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
  createAt: {
    type: Date,
    default: Date.now,
  },
  tests: {
    type: [testSchema],
    default: [],
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});

const Examination = model("Examination", examinationSchema, "Examination");

export { Examination, examinationSchema };
