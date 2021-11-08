import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { envVariables } from "../configs";
import { Token } from "../models";

const { jwtSecret } = envVariables;

export const encodeToken = async (data) => {
  const token = jwt.sign(data, jwtSecret, {
    // expiresIn: "8640000"
  });
  const token1 = await Token.create({
    userId: data._id,
    token,
  });
  console.log(token1);
  return token;
};

export const verifyToken = async (token) => {
  const data = jwt.verify(token, jwtSecret);
  const existedToken = await Token.findOne({ token });
  if (!existedToken) {
    throw createHttpError(400, "Token is not exists!");
  }
  return data;
};
export const destroyToken = async (userId) => {
  await Token.findOneAndDelete(userId);
};
