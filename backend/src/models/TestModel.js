import { Schema, model } from "mongoose";
const testSchema = new Schema({
  examinationId: {
    type: Schema.Types.ObjectId,
  },
  studentId: {
    type: Schema.Types.ObjectId,
  },
  videoUrlSubmit: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  isPass: {
    type: Boolean,
    default: false,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
  evaluate: {
    type: String,
  },
});

const Test = model("Test", testSchema, "Test");
export { Test, testSchema };
