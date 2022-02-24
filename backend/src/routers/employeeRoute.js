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
employeeRoute.use(`${baseUrl}`, jwtMiddleware);
employeeRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isAdminRole, createNewEmployee);
employeeRoute.route(`${baseUrl}?`).get(getListEmployees);
employeeRoute.route(`${baseUrl}/:employeeId`).get(getEmployeeById);
employeeRoute
  .route(`${baseUrl}`)
  .delete(validatePermission.isAdminRole, deleteEmployeeById);
employeeRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isAdminRole, banEmployeeById);
