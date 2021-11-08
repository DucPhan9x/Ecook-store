import createHttpError from "http-errors";
import { verifyToken } from "../utils";
export const jwtMiddleware = async (req, res, next) => {
  try {
    console.log("authorization: ", req.headers.authorization);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      throw createHttpError(401, "No token, authorization denied!");
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const userData = await verifyToken(token);
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
