import { Router } from "express";
import { customerController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/customer";
const { getCustomerById, getListCustomers, banCustomerById } =
  customerController;

export const customerRoute = Router();
customerRoute.use(`${baseUrl}`, jwtMiddleware, validatePermission.isAdminRole);
customerRoute.route(`${baseUrl}`).get(getListCustomers);
customerRoute.route(`${baseUrl}/:customerId`).get(getCustomerById);
customerRoute.route(`${baseUrl}`).put(banCustomerById);
