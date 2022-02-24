import { Router } from "express";
import { cartItemController } from "../controllers";
import { jwtMiddleware } from "../middlewares";

const baseUrl = "/api/v1/cart-item";
const {
  createNewCartItem,
  getListCartItem,
  updateCartItem,
  deleteAllCartItem,
  deleteCartItem,
} = cartItemController;

export const cartItemRoute = Router();
cartItemRoute.use(`${baseUrl}`, jwtMiddleware);
cartItemRoute.route(`${baseUrl}`).post(createNewCartItem);
cartItemRoute.route(`${baseUrl}/:itemType`).get(getListCartItem);
cartItemRoute.route(`${baseUrl}`).put(updateCartItem);
cartItemRoute
  .route(`${baseUrl}/delete-all/:itemType`)
  .delete(deleteAllCartItem);
cartItemRoute.route(`${baseUrl}`).delete(deleteCartItem);
