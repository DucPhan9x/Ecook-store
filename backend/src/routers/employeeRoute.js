import { Router } from "express";
import { employeeController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/employee";
const {
  createNewEmployee,
  updateEmployeeById,
  getEmployeeById,
  getListEmployees,
  deleteEmployeeById,
  banEmployeeById,
} = employeeController;

export const employeeRoute = Router();
employeeRoute.use(`${baseUrl}`, jwtMiddleware, validatePermission.isAdminRole);
employeeRoute.route(`${baseUrl}`).post(createNewEmployee);
employeeRoute.route(`${baseUrl}`).get(getListEmployees);
employeeRoute.route(`${baseUrl}/:employeeId`).get(getEmployeeById);
employeeRoute.route(`${baseUrl}/:employeeId`).put(updateEmployeeById);
employeeRoute.route(`${baseUrl}`).delete(deleteEmployeeById);
employeeRoute.route(`${baseUrl}`).put(banEmployeeById);
