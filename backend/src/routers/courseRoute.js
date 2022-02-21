import { Router } from "express";
import { courseController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/course";
const {
  createNewCourse,
  updateCourseById,
  deleteCourseById,
  getListCoursePerPage,
  getCourseById,
} = courseController;

export const courseRoute = Router();
courseRoute.use(`${baseUrl}`, jwtMiddleware);
courseRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isInstructorRole, createNewCourse);
courseRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isInstructorRole, updateCourseById);
courseRoute
  .route(`${baseUrl}/delete`)
  .put(validatePermission.isInstructorRole, deleteCourseById);
courseRoute.route(`${baseUrl}/:courseId`).get(getCourseById);
courseRoute.route(`${baseUrl}?`).get(getListCoursePerPage);
