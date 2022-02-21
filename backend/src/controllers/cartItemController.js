import { CartItem } from "../models";

const getListCartItem = async (req, res, next) => {
  try {
    const customerId = req.user._id;
    const { itemType } = req.body; // 1 food, 2 course
    let cartItems = await CartItem.find({
      customerId,
      itemType,
    });

    let itemDetails = cartItems.map((item) => {
      if (item.itemType === 1) {
        return Food.findById(item.itemId);
      } else {
        return Course.findById(item.itemId);
      }
    });

    itemDetails = await Promise.all(itemDetails);
    let data = cartItems.map((i, index) => {
      return {
        ...i,
        item: itemDetails[index],
      };
    });
    res.status(200).json({
      status: 200,
      msg: "Get cart items successfully!",
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addOneCartItem = async (userId, itemId, itemType, quantity) => {
  try {
    const existedCartItem = await CartItem.findOne({
      customerId: userId,
      itemId,
    });
    quantity = Number(quantity);
    if (existedCartItem) {
      await CartItem.findByIdAndUpdate(existedCartItem._id, {
        quantity: existedCartItem.quantity + quantity,
      });
    } else {
      await CartItem.create({
        customerId: userId,
        itemId,
        itemType,
        quantity,
      });
    }
  } catch (error) {
    throw createHttpError(400, error);
  }
};

const createNewCartItem = async (req, res, next) => {
  try {
    const customerId = req.user._id;
    let { itemId, itemType, quantity, cartItems } = req.body;
    if (!cartItems) {
      await addOneCartItem(customerId, itemId, itemType, quantity);
    } else {
      cartItems = JSON.parse(cartItems);
      const keys = Object.keys(cartItems);
      for (const key of keys) {
        await addOneCartItem(userId, key, cartItems[x]);
      }
    }
    res.status(200).json({
      status: 201,
      msg: "Add cart item(s) successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    let { cartItems } = req.body;
    cartItems = JSON.parse(cartItems);
    const keys = Object.keys(cartItems);
    const cartItem = await Promise.all(
      keys.map((x) => {
        return CartItem.findByIdAndUpdate(x, {
          quantity: cartItems[x],
        });
      })
    );
    if (!cartItem) {
      throw createHttpError(404, "Not found item(s)");
    }
    res.status(200).json({
      status: 200,
      msg: "Update cart item(s) successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const { cartItems } = req.body;
    const cartItem = await CartItem.deleteMany({
      _id: {
        $in: cartItems,
      },
    });
    if (!cartItem) {
      throw createHttpError(404, "Not found item(s)");
    }
    res.status(200).json({
      status: 200,
      msg: "Delete cart item(s) successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteAllCartItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { itemType } = req.body;
    await CartItem.remove({ customerId: userId, itemType });
    res.status(200).json({
      status: 200,
      msg: "Delete all cart item(s) successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const cartItemController = {
  getListCartItem,
  createNewCartItem,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItem,
};
