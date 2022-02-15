import { Recipe } from "../models";
import createHttpError from "http-errors";

const createNewRecipe = async (req, res, next) => {
  try {
    const { name, instructorId, material, slotQuantity } = req.body;

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
      data: newRecipe,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateRecipeById = async (req, res, next) => {
  try {
    const { name, instructorId, material, slotQuantity } = req.body;
    const recipeId = req.params.recipeId;
    const existedRecipe = await Recipe.findById(recipeId);

    if (!existedRecipe) {
      throw createHttpError(404, "Recipe is not exist!");
    }
    const newRecipe = await Recipe.findByIdAndUpdate(recipeId, {
      name,
      instructorId,
      material,
      slotQuantity,
    });

    res.status(200).json({
      status: 200,
      msg: "Update recipe successfully!",
      recipe: newRecipe,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteRecipeById = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const existedRecipe = await Recipe.findById(recipeId);

    if (!existedRecipe) {
      throw createHttpError(404, "Recipe is not exist!");
    }
    Recipe.findByIdAndRemove(recipeId),
      res.status(200).json({
        status: 200,
        msg: "Delete recipe successfully!",
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getListRecipePerPage = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    page = page ? page : 1;
    searchText = searchText ? searchText : "";
    orderBy = orderBy ? orderBy : "";
    orderType = orderType ? orderType : 1;
    const orderQuery = orderBy ? { [orderBy]: orderType } : {};

    const start = (page - 1) * numOfPerPage;
    let totalNumOfRecipes;
    let recipes;
    if (searchText) {
      recipes = await Recipe.find({
        $text: { $search: searchText },
        isRemoved: true,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({
        $text: { $search: searchText },
        isRemoved: true,
      }).count();
    } else {
      recipes = await Recipe.find({ isRemoved: true })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({ isRemoved: true }).count();
    }
    const totalPage = parseInt(totalNumOfRecipes / numOfPerPage) + 1;
    res.status(200).json({
      status: 200,
      msg: "Get recipes successfully!",
      recipes,
      totalPage,
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
    recipe = {
      ...recipe._doc,
      feedbacks,
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
