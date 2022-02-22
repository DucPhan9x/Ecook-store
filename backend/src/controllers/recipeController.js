import { Recipe } from "../models";
import createHttpError from "http-errors";

const createNewRecipe = async (req, res, next) => {
  try {
    const { name, material, slotQuantity } = req.body;
    const instructorId = req.user._id;
    const instructor = await UserDetail.findOne({ userId: instructorId });

    if (material.length <= 0) {
      throw createHttpError(404, "Materials list are not exist!");
    }

    const newRecipe = await Recipe.create({
      name,
      instructorId,
      material,
      slotQuantity,
    });

    res.status(200).json({
      status: 200,
      msg: "Create new recipe successfully!",
      recipe: { ...newRecipe, instructor },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRecipeById = async (req, res, next) => {
  try {
    const { recipeId, name, material, slotQuantity } = req.body;
    const instructorId = req.user._id;
    const instructor = await UserDetail.findOne({ userId: instructorId });

    const existedRecipe = await Recipe.findById(recipeId);

    if (!existedRecipe) {
      throw createHttpError(404, "Recipe is not exist!");
    }
    await Recipe.findByIdAndUpdate(recipeId, {
      name,
      instructorId,
      material,
      slotQuantity,
    });
    const newRecipe = await Recipe.findById(recipeId);

    res.status(200).json({
      status: 200,
      msg: "Update recipe successfully!",
      recipe: { ...newRecipe, instructor },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteRecipeById = async (req, res, next) => {
  try {
    const recipeIds = req.body;
    for (let i = 0; i < recipeIds.length; i++) {
      const recipeId = recipeIds[i];
      const recipe = await Promise.all([
        Recipe.findByIdAndUpdate(recipeId, {
          isRemoved: true,
        }),
      ]);
      if (!recipe) {
        throw createHttpError(400, "Recipe is not exist!");
      }
    }
    res.status(200).json({
      status: 200,
      msg: "Delete recipe(s) successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListRecipePerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    numOfPerPage = Number(numOfPerPage);
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "numOfStars";
    orderType = orderType === "asc" ? 1 : 0;
    const orderQuery = { [orderBy]: orderType };

    const start = (page - 1) * numOfPerPage;
    let totalNumOfRecipes;
    let recipes;
    if (searchText) {
      let regex = new RegExp([searchText].join(""), "i");
      recipes = await Recipe.find({
        name: { $regex: regex },
        isRemoved: false,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({
        name: { $regex: regex },
        isRemoved: false,
      }).count();
    } else {
      recipes = await Recipe.find({ isRemoved: false })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({ isRemoved: false }).count();
    }
    const totalRows = await Recipe.find({ isRemoved: false }).count();
    let instructorsData = recipes.map((item) =>
      UserDetail.findOne({ userId: item.instructorId })
    );
    instructorsData = await Promise.all(instructorsData);
    recipes = recipes.map((item, index) => ({
      ...item._doc,
      instructor: instructorsData[index],
    }));
    const totalPage = parseInt(totalNumOfRecipes / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get recipes successfully!",
      recipes,
      totalPage,
      totalRows,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    let recipe = await Recipe.findById(recipeId);
    let feedbacks = await Feedback.find({ itemId: recipeId });
    feedbacks = feedbacks.map((item) => {
      return {
        _id: item._id,
        userId: item.userId,
        content: item.content,
        numOfStars: item.numOfStars,
        createAt: item.createAt,
        reply: item.reply,
        feedbackType: 2,
      };
    });
    const instructor = await UserDetail.findOne({
      userId: recipe.instructorId,
    });
    recipe = {
      ...recipe._doc,
      feedbacks,
      instructor,
    };
    res.status(200).json({
      status: 200,
      msg: "Get recipe successfully!",
      recipe,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const recipeController = {
  createNewRecipe,
  updateRecipeById,
  deleteRecipeById,
  getListRecipePerPage,
  getRecipeById,
};
