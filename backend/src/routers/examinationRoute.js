import { Router } from "express";
import { examinationController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/examination";
const { getExaminationByCourseId } = examinationController;

export const examinationRoute = Router();
examinationRoute.use(`${baseUrl}`, jwtMiddleware);
examinationRoute.route(`${baseUrl}/:courseId`).get(getExaminationByCourseId);
