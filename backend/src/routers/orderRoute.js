import { Router } from "express";
import { orderController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/order";
const { paypalPayment } = orderController;

export const orderRoute = Router();
orderRoute.use(`${baseUrl}`, jwtMiddleware);
orderRoute.route(`${baseUrl}/paypal-execute`).post(paypalPayment);
