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
  getListCourseByInstructorId,
  getListCoursesRelated,
  getCoursesByClientId,
} = courseController;

export const courseRoute = Router();
courseRoute
  .route(`${baseUrl}`)
  .post(jwtMiddleware, validatePermission.isInstructorRole, createNewCourse);
courseRoute
  .route(`${baseUrl}`)
  .put(jwtMiddleware, validatePermission.isInstructorRole, updateCourseById);
courseRoute
  .route(`${baseUrl}/delete`)
  .put(jwtMiddleware, validatePermission.isInstructorRole, deleteCourseById);
courseRoute.route(`${baseUrl}/:courseId`).get(getCourseById);
courseRoute.route(`${baseUrl}?`).get(getListCoursePerPage);
courseRoute.route(`${baseUrl}/by/instructor?`).get(getListCourseByInstructorId);
// client
courseRoute.route(`${baseUrl}/by/related?`).get(getListCoursesRelated);
courseRoute
  .route(`${baseUrl}/by/client?`)
  .get(jwtMiddleware, getCoursesByClientId);
