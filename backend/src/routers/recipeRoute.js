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
recipeRoute.use(
  `${baseUrl}`,
  jwtMiddleware,
  validatePermission.isInstructorRole
);
recipeRoute.route(`${baseUrl}`).post(createNewRecipe);
recipeRoute.route(`${baseUrl}/:recipeId`).put(updateRecipeById);
recipeRoute.route(`${baseUrl}/:recipeId`).delete(deleteRecipeById);
recipeRoute.route(`${baseUrl}/:recipeId`).get(getRecipeById);
recipeRoute.route(`${baseUrl}`).get(getListRecipePerPage);
