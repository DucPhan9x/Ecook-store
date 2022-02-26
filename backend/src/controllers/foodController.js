import { Feedback, Food } from "../models";
import { deleteImage, uploadSingle } from "../configs";
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
    return Food.create({
      typeId,
      name,
      unitPrice,
      unit,
      imageUrl: image ? image.url : "",
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
    let { foodLists } = req.body;
    let filePath;
    if (req.files[0]) {
      filePath = req.files[0].path;
    }
    foodLists = JSON.parse(foodLists);
    let foods = [];
    for (var i = 0; i < foodLists.length; i++) {
      foods.push(await createNewFood(foodLists[i], filePath));
    }
    res.status(200).json({
      status: 200,
      msg: "Create new food(s) successfully!",
      foods,
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

    if (!food) {
      throw createHttpError(400, "Food not found");
    }

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
      _id,
      name,
      unitPrice,
      typeId,
      unit,
      imageUrl,
      discountOff,
      description,
      discountMaximum,
    } = JSON.parse(req.body.foodUpdated);
    const foodId = _id;
    let filePath;
    if (req.files[0]) {
      filePath = req.files[0].path;
    }
    let image;
    if (filePath) {
      image = await uploadSingle(filePath);

      const asset_id = imageUrl.split("/").pop().split(".")[0];
      if (asset_id) {
        await deleteImage(asset_id);
      }
    }
    const existedFood = await Food.findById(foodId);
    if (!existedFood) {
      throw createHttpError(404, "Food id not exist!");
    }
    await Food.findByIdAndUpdate(foodId, {
      name,
      unitPrice,
      typeId,
      unit,
      imageUrl: image ? image.url : imageUrl,
      discountOff,
      description,
      discountMaximum,
    });
    const newFood = await Food.findById(foodId);
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
    const foodId = req.params.foodId;
    const isRemoveTemp = req.params.isRemoveTemp;
    const existedFood = await Food.findById(foodId);
    if (!existedFood) {
      throw createHttpError(404, "Food id not exist!");
    }
    await Food.findByIdAndUpdate(foodId, {
      isRemoveTemp,
    });
    const newFood = await Food.findById(foodId);
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
    orderBy = orderBy ? orderBy : "unitPrice";
    orderType = orderType === "asc" ? 1 : -1;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfFoods;
    let foods;
    if (searchText) {
      if (typeId) {
        foods = await Food.find({
          $text: { $search: searchText },
          typeId,
        })
          .skip(start)
          .limit(Number(numOfPerPage))
          .sort(orderQuery);
        totalNumOfFoods = await Food.find({
          $text: { $search: searchText },
          typeId,
        }).count();
      } else {
        foods = await Food.find({
          $text: { $search: searchText },
        })
          .skip(start)
          .limit(Number(numOfPerPage))
          .sort(orderQuery);
        totalNumOfFoods = await Food.find({
          $text: { $search: searchText },
        }).count();
      }
    } else {
      if (typeId) {
        foods = await Food.find({ typeId })
          .skip(start)
          .limit(Number(numOfPerPage))
          .sort(orderQuery);
        totalNumOfFoods = await Food.find({ typeId }).count();
      } else {
        foods = await Food.find()
          .skip(start)
          .limit(Number(numOfPerPage))
          .sort(orderQuery);
        totalNumOfFoods = await Food.find().count();
      }
    }

    const totalPage = parseInt(totalNumOfFoods / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get foods successfully!",
      foods,
      totalPage,
      totalRows: totalNumOfFoods,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get 15 items
const getListFoodsRelated = async (req, res, next) => {
  try {
    let { searchText } = req.query;
    const numOfPerPage = Number(15);
    const page = 1;
    searchText = searchText;

    const start = (page - 1) * numOfPerPage;
    let foods;
    foods = await Food.find({
      $text: { $search: searchText },
      isRemoveTemp: false,
      name: { $nin: searchText },
    })
      .skip(start)
      .limit(numOfPerPage);

    res.status(200).json({
      status: 200,
      msg: "Get foods successfully!",
      foods,
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
  getListFoodsRelated,
};
