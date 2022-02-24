import { Router } from "express";
import { jwtMiddleware, validatePermission } from "../middlewares";
import { statisticController } from "../controllers";
const baseUrl = "/api/v1/statistic";
const { getRevenuesInfo, getGeneralInfo } = statisticController;
export const statisticRoute = Router();

statisticRoute.use(baseUrl, jwtMiddleware);
statisticRoute.route(`${baseUrl}/revenueInfo/:getInfoBy`).get(getRevenuesInfo);
statisticRoute.route(`${baseUrl}/generalInfo`).get(getGeneralInfo);
