import { Schema, model } from "mongoose";
const wishlistSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
  foodIds: [{ type: Schema.Types.ObjectId }],
});
export const Wishlist = model("Wishlist", wishlistSchema, "Wishlist");
