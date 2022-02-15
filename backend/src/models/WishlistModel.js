import { Schema, model } from "mongoose";
const wishlistSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  itemIds: {
    type: [{ itemId: Schema.Types.ObjectId, itemType: Number }],
    default: [],
  },
});
export const Wishlist = model("Wishlist", wishlistSchema, "Wishlist");
