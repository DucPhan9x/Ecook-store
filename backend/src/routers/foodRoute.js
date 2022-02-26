import { Router } from "express";
import { foodController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/food";
const {
  getListFoodPerPage,
  getFoodById,
  updateFoodById,
  updateStatusRemoveTempFood,
  creatMultipleNewFood,
  getListFoodsRelated,
} = foodController;

export const foodRoute = Router();
foodRoute
  .route(`${baseUrl}`)
  .post(
    jwtMiddleware,
    validatePermission.isAdministratorAndInstructorRole,
    creatMultipleNewFood
  );
foodRoute
  .route(`${baseUrl}/update`)
  .put(
    jwtMiddleware,
    validatePermission.isAdministratorAndInstructorRole,
    updateFoodById
  );
foodRoute.route(`${baseUrl}?`).get(getListFoodPerPage);
foodRoute.route(`${baseUrl}/:foodId`).get(getFoodById);
foodRoute
  .route(`${baseUrl}/statusRemoveTemp/:foodId/:isRemoveTemp`)
  .put(
    jwtMiddleware,
    validatePermission.isAdministratorAndInstructorRole,
    updateStatusRemoveTempFood
  );
foodRoute.route(`${baseUrl}/by/related?`).get(getListFoodsRelated);
