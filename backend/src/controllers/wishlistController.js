import { Course, Food, Recipe, Wishlist } from "../models";

const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { itemType } = req.params;
    let wishlist = await Wishlist.findOne({
      userId,
    });
    let itemIds = wishlist.itemIds
      .filter((item) => item.itemType === itemType)
      .map((ele) => ele.itemId)
      .map((id) => {
        if (itemType === 1) {
          return Food.findById(id);
        } else {
          if (itemType === 2) {
            return Recipe.findById(id);
          } else {
            return Course.findById(id);
          }
        }
      });

    let data = await Promise.all(itemIds);
    res.status(200).json({
      status: 200,
      msg: "Get wishlist successfully!",
      wishlists: data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { itemId, itemType } = req.body;
    const item = await Wishlist.findOne({
      userId,
      itemIds: { $elemMatch: { itemId } },
    });
    if (item)
      await Wishlist.findByIdAndUpdate(item._id, {
        $pull: { itemIds: { itemId, itemType } },
      });
    else
      await Wishlist.findOneAndUpdate(
        { userId },
        { $push: { itemIds: { itemId, itemType } } }
      );
    res.status(200).json({
      status: 200,
      msg: "Update wishlist successfully!",
      isRemoveStatus: !!item,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const wishlistController = {
  getWishlist,
  updateWishlist,
};
