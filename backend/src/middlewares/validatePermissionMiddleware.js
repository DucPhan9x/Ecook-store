import createHttpError from "http-errors";
import { Role } from "../models";
const isAdminRole = async (req, res, next) => {
  const user = req.user;
  try {
    const adminRole = await Role.findOne({ roleName: "admin" });
    if (user.roleId != adminRole.id) {
      throw createHttpError(401, "You are not admin account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validatePermission = {
  isAdminRole,
};
