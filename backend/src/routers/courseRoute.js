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
courseRoute.use(
  `${baseUrl}`,
  jwtMiddleware,
  validatePermission.isInstructorRole
);
courseRoute.route(`${baseUrl}`).post(createNewCourse);
courseRoute.route(`${baseUrl}/:courseId`).put(updateCourseById);
courseRoute.route(`${baseUrl}/:courseId`).delete(deleteCourseById);
courseRoute.route(`${baseUrl}/:courseId`).get(getCourseById);
courseRoute.route(`${baseUrl}`).get(getListCoursePerPage);
