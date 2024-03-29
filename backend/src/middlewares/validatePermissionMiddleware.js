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

const isAdministratorRole = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.roleId != 2 && user.roleId != 3) {
      throw createHttpError(401, "You are not administrator account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isAdministratorAndInstructorRole = async (req, res, next) => {
  const user = req.user;
  try {
    if (user.roleId === 1) {
      throw createHttpError(401, "You are not administrator account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isCustomerRole = async (req, res, next) => {
  const user = req.user;
  try {
    const customerRole = await Role.findOne({ roleName: "customer" });
    if (user.roleId != customerRole.id) {
      throw createHttpError(401, "You are not customer account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isEmployeeRole = async (req, res, next) => {
  const user = req.user;
  try {
    const employeeRole = await Role.findOne({ roleName: "employee" });
    if (user.roleId != employeeRole.id) {
      throw createHttpError(401, "You are not employee account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const isInstructorRole = async (req, res, next) => {
  const user = req.user;
  try {
    const instructorRole = await Role.findOne({ roleName: "instructor" });
    if (user.roleId != instructorRole.id) {
      throw createHttpError(401, "You are not instructor account!");
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validatePermission = {
  isAdminRole,
  isEmployeeRole,
  isInstructorRole,
  isCustomerRole,
  isAdministratorAndInstructorRole,
  isAdministratorRole,
};
