import { Router } from "express";
import { feedbackController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/feedback";
const { addFeedback, reply, getAllFeedbacks } = feedbackController;

export const feedbackRoute = Router();
feedbackRoute.use(`${baseUrl}`, jwtMiddleware);
feedbackRoute.route(`${baseUrl}`).post(addFeedback);
feedbackRoute.route(`${baseUrl}/reply`).post(reply);
feedbackRoute.route(`${baseUrl}/:itemId`).get(getAllFeedbacks);
