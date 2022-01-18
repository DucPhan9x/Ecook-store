import { Schema, model } from "mongoose";
import { Course } from "./CourseModel";
const studentSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
  },
  courseList: [Course],
});
export const Student = model("Student", studentSchema, "Student");
