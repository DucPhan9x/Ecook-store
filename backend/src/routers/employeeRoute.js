import { Router } from "express";
import { employeeController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/employee";
const {
  createNewEmployee,
  getEmployeeById,
  getListEmployees,
  deleteEmployeeById,
  banEmployeeById,
} = employeeController;

export const employeeRoute = Router();
employeeRoute
  .route(`${baseUrl}`)
  .post(jwtMiddleware, validatePermission.isAdminRole, createNewEmployee);
employeeRoute.route(`${baseUrl}?`).get(getListEmployees);
employeeRoute.route(`${baseUrl}/:employeeId`).get(getEmployeeById);
employeeRoute
  .route(`${baseUrl}`)
  .delete(jwtMiddleware, validatePermission.isAdminRole, deleteEmployeeById);
employeeRoute
  .route(`${baseUrl}`)
  .put(jwtMiddleware, validatePermission.isAdminRole, banEmployeeById);
