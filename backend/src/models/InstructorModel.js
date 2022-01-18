import { Schema, model } from "mongoose";
const instructorSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
  },
  expertise: String,
});
export const Instructor = model("Instructor", instructorSchema, "Instructor");
