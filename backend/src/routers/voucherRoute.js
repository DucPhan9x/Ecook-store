import { Router } from "express";
import { voucherController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/voucher";
const {
  createNewVoucher,
  updateVoucherById,
  deleteVoucherById,
  getListVoucherPerPage,
  getVoucherById,
} = voucherController;

export const voucherRoute = Router();
voucherRoute.use(`${baseUrl}`, jwtMiddleware);
voucherRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isEmployeeRole, createNewVoucher);
voucherRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isEmployeeRole, updateVoucherById);
voucherRoute
  .route(`${baseUrl}`)
  .delete(validatePermission.isEmployeeRole, deleteVoucherById);
voucherRoute.route(`${baseUrl}/:voucherId`).get(getVoucherById);
voucherRoute.route(`${baseUrl}?`).get(getListVoucherPerPage);
