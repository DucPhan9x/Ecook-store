import { Router } from "express";
import { wishlistController } from "../controllers";
import { jwtMiddleware, validatePermission } from "../middlewares";

const baseUrl = "/api/v1/wishlist";
const { getWishlist, updateWishlist } = wishlistController;

export const wishlistRoute = Router();
wishlistRoute.use(`${baseUrl}`, jwtMiddleware);
wishlistRoute.route(`${baseUrl}`).get(getWishlist);
wishlistRoute
  .route(`${baseUrl}`)
  .put(validatePermission.isCustomerRole, updateWishlist);
