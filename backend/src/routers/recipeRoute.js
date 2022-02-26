import { Router } from "express";
import { recipeController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/recipe";
const {
  createNewRecipe,
  updateRecipeById,
  deleteRecipeById,
  getListRecipePerPage,
  getRecipeById,
  getListRecipeByInstructorId,
  getListRecipesRelatedFoodName,
} = recipeController;

export const recipeRoute = Router();
recipeRoute
  .route(`${baseUrl}`)
  .post(jwtMiddleware, validatePermission.isInstructorRole, createNewRecipe);
recipeRoute
  .route(`${baseUrl}`)
  .put(jwtMiddleware, validatePermission.isInstructorRole, updateRecipeById);
recipeRoute
  .route(`${baseUrl}`)
  .delete(jwtMiddleware, validatePermission.isInstructorRole, deleteRecipeById);
recipeRoute.route(`${baseUrl}/:recipeId`).get(jwtMiddleware, getRecipeById);
recipeRoute.route(`${baseUrl}?`).get(getListRecipePerPage);
recipeRoute
  .route(`${baseUrl}/by/related-foodName?`)
  .get(getListRecipesRelatedFoodName);
recipeRoute
  .route(`${baseUrl}/by/instructor?`)
  .get(jwtMiddleware, getListRecipeByInstructorId);
