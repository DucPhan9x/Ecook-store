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
foodRoute.use(`${baseUrl}`, jwtMiddleware);
foodRoute
  .route(`${baseUrl}`)
  .post(
    validatePermission.isAdministratorAndInstructorRole,
    creatMultipleNewFood
  );
foodRoute
  .route(`${baseUrl}/update`)
  .put(validatePermission.isAdministratorAndInstructorRole, updateFoodById);
foodRoute.route(`${baseUrl}?`).get(getListFoodPerPage);
foodRoute.route(`${baseUrl}/:foodId`).get(getFoodById);
foodRoute
  .route(`${baseUrl}/statusRemoveTemp/:foodId/:isRemoveTemp`)
  .put(
    validatePermission.isAdministratorAndInstructorRole,
    updateStatusRemoveTempFood
  );
foodRoute.route(`${baseUrl}/by/related?`).get(getListFoodsRelated);
