import { Router } from "express";
import { orderController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/order";
const {
  paypalPayment,
  paypalPaymentCourse,
  getOrdersByClientId,
  getAllOrders,
  updateStatusOrder,
  paymentRedirectMoney,
  checkExistMyCourse,
} = orderController;

export const orderRoute = Router();
orderRoute.use(`${baseUrl}`, jwtMiddleware);
orderRoute.route(`${baseUrl}/paypal-execute`).post(paypalPayment);
// payment course
orderRoute.route(`${baseUrl}/paypal-execute/course`).post(paypalPaymentCourse);
// payment direct by money
orderRoute.route(`${baseUrl}/payment-direct-money`).post(paymentRedirectMoney);
// employee, admin get all orders
orderRoute.route(`${baseUrl}?`).get(getAllOrders);
// client side
orderRoute.route(`${baseUrl}/get-all-by-clientID?`).get(getOrdersByClientId);
orderRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isAdministratorRole, updateStatusOrder);
orderRoute.route(`${baseUrl}/check-exist-courses`).get(checkExistMyCourse);
