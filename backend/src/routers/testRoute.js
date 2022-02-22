import { Router } from "express";
import { testController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/test";
const {
  submitTestOfExamination,
  updateTestOfExamination,
  getListTest,
  getTestByExamination,
} = testController;

export const testRoute = Router();
testRoute.use(`${baseUrl}`, jwtMiddleware);
testRoute.route(`${baseUrl}?`).get(getListTest);
testRoute.route(`${baseUrl}/:courseId`).get(getTestByExamination);
testRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isInstructorRole, updateTestOfExamination);
testRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isCustomerRole, submitTestOfExamination);
