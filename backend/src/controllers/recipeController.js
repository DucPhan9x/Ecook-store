import { Feedback, Recipe, UserDetail } from "../models";
import createHttpError from "http-errors";
import { deleteImage, uploadSingle } from "../configs";

const createNewRecipe = async (req, res, next) => {
  try {
    let { name, materials, slotQuantity, description, contents } = req.body;
    materials = JSON.parse(materials);
    contents = JSON.parse(contents);
    const instructorId = req.user._id;
    const instructor = await UserDetail.findOne({ userId: instructorId });

    if (materials.length <= 0) {
      throw createHttpError(404, "Materials list are not exist!");
    }
    let filePath;
    if (req.files[0]) {
      filePath = req.files[0].path;
    }
    let image;
    if (filePath) {
      image = await uploadSingle(filePath);
    }

    const newRecipe = await Recipe.create({
      name,
      instructorId,
      materials,
      slotQuantity,
      description,
      contents,
      imageUrl: image.url || "",
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
  console.log(req.body);

  try {
    const {
      recipeId,
      name,
      materials,
      slotQuantity,
      description,
      contents,
      imageUrl,
    } = JSON.parse(req.body.recipeUpdated);
    console.log(req.body);
    const instructorId = req.user._id;
    const instructor = await UserDetail.findOne({ userId: instructorId });

    const existedRecipe = await Recipe.findOne({
      _id: recipeId,
      isRemoved: false,
    });

    if (!existedRecipe) {
      throw createHttpError(404, "Recipe is not exist!");
    }
    if (existedRecipe.instructorId != instructorId) {
      throw createHttpError(
        404,
        "You're not instructor that created this recipe!"
      );
    }

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

    await Recipe.findByIdAndUpdate(recipeId, {
      name,
      instructorId,
      materials,
      slotQuantity,
      contents,
      description,
      imageUrl: image ? image.url : imageUrl,
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
    const { recipeIds } = req.body;
    for (let i = 0; i < recipeIds.length; i++) {
      const recipeId = recipeIds[i];
      const instructorId = req.user._id;
      const recipe = await Recipe.findOne({ _id: recipeId, isRemoved: false });
      if (!recipe) {
        throw createHttpError(400, "Recipe is not exist!");
      }
      if (recipe.instructorId != instructorId) {
        throw createHttpError(
          404,
          "You're not instructor that created this recipe!"
        );
      }

      await Promise.all([
        Recipe.findByIdAndUpdate(recipeId, {
          isRemoved: true,
        }),
      ]);
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

// get 15 items
const getListRecipesRelatedFoodName = async (req, res, next) => {
  try {
    let { searchText } = req.query;
    numOfPerPage = Number(15);
    page = 1;
    searchText = searchText;

    const start = (page - 1) * numOfPerPage;
    let recipes;
    recipes = await Recipe.find({
      $text: { $search: searchText },
      isRemoved: false,
    })
      .skip(start)
      .limit(numOfPerPage);

    res.status(200).json({
      status: 200,
      msg: "Get recipes successfully!",
      recipes,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get recipe by instructorId
const getListRecipeByInstructorId = async (req, res, next) => {
  try {
    let { page, searchText, orderBy, orderType, numOfPerPage } = req.query;
    const instructorId = req.user._id;

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
        instructorId,
      })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({
        name: { $regex: regex },
        isRemoved: false,
        instructorId,
      }).count();
    } else {
      recipes = await Recipe.find({ isRemoved: false, instructorId })
        .skip(start)
        .limit(numOfPerPage)
        .sort(orderQuery);
      totalNumOfRecipes = await Recipe.find({
        isRemoved: false,
        instructorId,
      }).count();
    }
    const totalRows = await Recipe.find({
      isRemoved: false,
      instructorId,
    }).count();
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
    let recipe = await Recipe.findOne({ _id: recipeId, isRemoved: false });
    if (!recipe) {
      throw createHttpError(400, "Recipe not found");
    }
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
  getListRecipeByInstructorId,
  getListRecipesRelatedFoodName,
};
