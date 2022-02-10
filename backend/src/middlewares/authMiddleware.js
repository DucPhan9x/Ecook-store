import createHttpError from "http-errors";
import { envVariables } from "../configs";
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
      console.log("a111: ", { userData });
      req.user = userData;
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
