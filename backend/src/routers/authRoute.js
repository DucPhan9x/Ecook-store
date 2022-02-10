import { Router } from "express";
import { authController } from "../controllers";
import { validateRequestBody, jwtMiddleware } from "../middlewares";
const {
  validateRegisterData,
  validateLoginData,
  validateChangePasswordData,
  validateResetPasswordData,
} = validateRequestBody;
const {
  registerCustomer,
  login,
  logout,
  sendResetCode,
  resetPassword,
  changePassword,
  getRoleId,
  activeAccount,
  loginAdmin,
  createAdminAccount,
  getToken,
} = authController;
const baseUrl = "/api/v1/auth";
export const authRoute = Router();
authRoute
  .route(`${baseUrl}/register`)
  .post(validateRegisterData, registerCustomer);
authRoute.route(`${baseUrl}/admin/register`).post(createAdminAccount);
authRoute.route(`${baseUrl}/login`).post(validateLoginData, login);
authRoute.route(`${baseUrl}/admin/login`).post(validateLoginData, loginAdmin);
authRoute.route(`${baseUrl}/logout`).post(jwtMiddleware, logout);
authRoute.route(`${baseUrl}/send-reset-code`).post(sendResetCode);
authRoute.route(`${baseUrl}/confirm/:token`).get(activeAccount);
authRoute
  .route(`${baseUrl}/new-password`)
  .post(validateResetPasswordData, resetPassword);
authRoute
  .route(`${baseUrl}/change-password`)
  .post(jwtMiddleware, validateChangePasswordData, changePassword);
authRoute.route(`${baseUrl}/roleId`).get(jwtMiddleware, getRoleId);
authRoute.route(`${baseUrl}/refresh-token`).get(getToken);
