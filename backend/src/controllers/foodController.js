import { Feedback, Food } from "../models";
import { uploadSingle } from "../configs";
import createHttpError from "http-errors";

const createNewFood = async (data, filePath) => {
  try {
    const {
      typeId,
      name,
      unitPrice,
      unit,
      discountOff,
      description,
      discountMaximum,
    } = data;
    let image;
    if (filePath) {
      image = await uploadSingle(filePath);
    }
    await Food.create({
      typeId,
      name,
      unitPrice,
      unit,
      imageUrl: image.url || "",
      discountOff,
      description,
      discountMaximum,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(500, error);
  }
};

const creatMultipleNewFood = async (req, res, next) => {
  try {
    const { foodLists } = req.body;
    let filePath;
    if (req.files[0].path) {
      filePath = req.files[0].path;
    }
    for (let index = 0; index < foodLists.length; index++) {
      const element = foodLists[index];
      await createNewFood(element, filePath);
    }
    res.status(201).json({
      status: 201,
      msg: "Create new food(s) successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get food for client web
const getFoodById = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    let food = await Food.findById(foodId);
    let feedbacks = await Feedback.find({ itemId: foodId });
    feedbacks = feedbacks.map((item) => {
      return {
        _id: item._id,
        userId: item.userId,
        content: item.content,
        numOfStars: item.numOfStars,
        createAt: item.createAt,
        reply: item.reply,
        feedbackType: 1,
      };
    });
    food = {
      ...food._doc,
      feedbacks,
    };
    res.status(200).json({
      status: 200,
      msg: "Get food successfully!",
      food,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateFoodById = async (req, res, next) => {
  try {
    const {
      name,
      unitPrice,
      typeId,
      unit,
      discountOff,
      description,
      discountMaximum,
    } = req.body;
    const foodId = req.params.foodId;
    const existedFood = await Food.findById(foodId);
    if (!existedFood) {
      throw createHttpError(404, "Food id not exist!");
    }
    const newFood = await Food.findByIdAndUpdate(foodId, {
      name,
      unitPrice,
      typeId,
      unit,
      discountOff,
      description,
      discountMaximum,
    });
    res.status(200).json({
      status: 200,
      msg: "Update food successfully!",
      food: newFood,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateStatusRemoveTempFood = async (req, res, next) => {
  try {
    const { isRemoveTemp } = req.body;
    const foodId = req.params.foodId;
    const existedFood = await Food.findById(foodId);
    if (!existedFood) {
      throw createHttpError(404, "Food id not exist!");
    }
    const newFood = await Food.findByIdAndUpdate(foodId, {
      isRemoveTemp,
    });
    res.status(200).json({
      status: 200,
      msg: "Update status remove temp successfully!",
      food: newFood,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFoodById = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    const existedFood = await Food.findById(foodId);
    if (!existedFood) {
      throw createHttpError(404, "Food is not found");
    }
    await Food.findByIdAndRemove(foodId);
    res.status(200).json({
      status: 200,
      msg: "Delete food successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListFoodPerPage = async (req, res, next) => {
  try {
    let { page, searchText, typeId, orderBy, orderType, numOfPerPage } =
      req.query;
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    const start = (page - 1) * numOfPerPage;
    let totalNumOfFoods;
    let foods;
    if (searchText) {
      foods = await Food.find({
        $text: { $search: searchText },
        typeId,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfFoods = await Food.find({
        $text: { $search: searchText },
        typeId,
      }).count();
    } else {
      foods = await Food.find({})
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfFoods = await Food.find({}).count();
    }
    const totalPage = parseInt(totalNumOfFoods / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get foods successfully!",
      foods,
      totalPage,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const foodController = {
  createNewFood,
  updateFoodById,
  deleteFoodById,
  getListFoodPerPage,
  creatMultipleNewFood,
  getFoodById,
  updateStatusRemoveTempFood,
};
