import { Router } from "express";
import { foodController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/food";
const {
  getListFoodPerPage,
  getFoodById,
  updateFoodById,
  updateStatusRemoveTempFood,
  creatMultipleNewFood,
} = foodController;

export const foodRoute = Router();
foodRoute.use(`${baseUrl}`, jwtMiddleware);
foodRoute.route(`${baseUrl}`).post(creatMultipleNewFood);
foodRoute.route(`${baseUrl}/update`).put(updateFoodById);
foodRoute.route(`${baseUrl}?`).get(getListFoodPerPage);
foodRoute.route(`${baseUrl}/:foodId`).get(getFoodById);
foodRoute
  .route(`${baseUrl}/statusRemoveTemp/:foodId/:isRemoveTemp`)
  .put(updateStatusRemoveTempFood);
