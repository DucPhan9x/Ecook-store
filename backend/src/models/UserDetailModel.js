import { Schema, model } from "mongoose";
import { courseSchema } from "./CourseModel";

const userDetailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  courseList: {
    type: [courseSchema],
  },
  expertise: String,
});
export const UserDetail = model("UserDetail", userDetailSchema, "UserDetail");
