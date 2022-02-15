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
voucherRoute.route(`${baseUrl}`).post(createNewVoucher);
voucherRoute.route(`${baseUrl}/:voucherId`).put(updateVoucherById);
voucherRoute.route(`${baseUrl}/:voucherId`).delete(deleteVoucherById);
voucherRoute.route(`${baseUrl}/:voucherId`).get(getVoucherById);
voucherRoute.route(`${baseUrl}`).get(getListVoucherPerPage);
