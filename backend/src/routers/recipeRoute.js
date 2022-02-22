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
} = recipeController;

export const recipeRoute = Router();
recipeRoute.use(`${baseUrl}`, jwtMiddleware);
recipeRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isInstructorRole, createNewRecipe);
recipeRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isInstructorRole, updateRecipeById);
recipeRoute
  .route(`${baseUrl}`)
  .delete(validatePermission.isInstructorRole, deleteRecipeById);
recipeRoute.route(`${baseUrl}/:recipeId`).get(getRecipeById);
recipeRoute.route(`${baseUrl}?`).get(getListRecipePerPage);
