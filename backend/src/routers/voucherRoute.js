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
  getListVoucherClient,
} = voucherController;

export const voucherRoute = Router();
voucherRoute.use(`${baseUrl}`, jwtMiddleware);
voucherRoute
  .route(`${baseUrl}`)
  .post(validatePermission.isAdministratorRole, createNewVoucher);
voucherRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isAdministratorRole, updateVoucherById);
voucherRoute
  .route(`${baseUrl}`)
  .delete(validatePermission.isAdministratorRole, deleteVoucherById);
voucherRoute.route(`${baseUrl}/:voucherId`).get(getVoucherById);
voucherRoute.route(`${baseUrl}?`).get(getListVoucherPerPage);
voucherRoute.route(`${baseUrl}/by/client?`).get(getListVoucherClient);
