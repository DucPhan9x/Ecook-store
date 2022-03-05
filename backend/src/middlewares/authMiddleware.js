import createHttpError from "http-errors";
import { envVariables } from "../configs";
import { User } from "../models";
import { verifyToken } from "../utils";
const { jwtSecret } = envVariables;

export const jwtMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      throw createHttpError(401, "No token, authorization denied!");
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userData = await verifyToken(token, jwtSecret);
      req.user = userData;
      // check ban
      const user = await User.findById(userData._id);
      if (user.isRemoved) {
        throw createHttpError(
          400,
          "Tài khoản của bạn bị khóa, vui lòng liên hệ system.ecook@gmail.com!"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
