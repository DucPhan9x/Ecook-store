import { Schema, model } from "mongoose";
import { courseSchema } from "./CourseModel";
const studentSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
  },
  courseList: {
    type: [courseSchema],
  },
});
export const Student = model("Student", studentSchema, "Student");
