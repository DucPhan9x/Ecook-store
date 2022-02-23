import { Router } from "express";
import { homePageClientController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/homeClient";
const { getListCourseAndInstructor, getListFoodAndRecipe } =
  homePageClientController;

export const homeClientRoute = Router();
homeClientRoute.use(`${baseUrl}`, jwtMiddleware);
homeClientRoute.route(`${baseUrl}/foods-recipes`).get(getListFoodAndRecipe);
homeClientRoute
  .route(`${baseUrl}/courses-instructors`)
  .get(getListCourseAndInstructor);
