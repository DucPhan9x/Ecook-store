import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { envVariables } from "../configs";
import { Token } from "../models";

const { jwtSecret, tokenLife } = envVariables;

export const encodeToken = async (data) => {
  const token = jwt.sign(data, jwtSecret);
  const token1 = await Token.create({
    userId: data._id,
    token,
  });
  console.log(token1);
  return token;
};

export const verifyToken = async (token, tokenSecret) => {
  let data;
  try {
    data = jwt.verify(token, tokenSecret);
  } catch (error) {
    await Token.findOneAndDelete({ token });
    throw createHttpError(401, "Token expired");
  }
  const existedToken = await Token.findOne({ token });
  if (!existedToken) {
    throw createHttpError(400, "Token is not exists!");
  }
  return data;
};

export const destroyToken = async (userId) => {
  await Token.findOneAndDelete(userId);
};
