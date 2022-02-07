import joi from "joi";
import { Role } from "../models";
import { validateRequest } from "../utils";
const validateRegisterData = async (req, res, next) => {
  try {
    const role = await Role.findOne({ roleName: "customer" });
    const registerSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6).max(50),
      roleId: joi.number().integer().required().valid(role.id),
      fullName: joi.string().required(),
    });
    validateRequest(req, registerSchema, next);
  } catch (error) {
    next(error);
  }
};

const validateLoginData = (req, res, next) => {
  try {
    const loginSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required().min(6).max(50),
    });
    validateRequest(req, loginSchema, next);
  } catch (error) {
    next(error);
  }
};

const validateResetPasswordData = async (req, res, next) => {
  try {
    const resetPasswordSchema = joi.object({
      code: joi.string().length(8).required(),
      newPassword: joi.string().required().min(6).max(50),
      confirmPassword: joi.valid(joi.ref("newPassword")),
      email: joi.string().email().required(),
    });
    validateRequest(req, resetPasswordSchema, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const validateChangePasswordData = async (req, res, next) => {
  try {
    const changePasswordSchema = joi.object({
      oldPassword: joi
        .string()
        .required()
        .min(6)
        .max(50)
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/),
      newPassword: joi
        .string()
        .required()
        .min(6)
        .max(50)
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/),
      confirmPassword: joi.valid(joi.ref("newPassword")),
    });
    validateRequest(req, changePasswordSchema, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const validateProfileData = async (req, res, next) => {
  try {
    console.log(req.body);
    const profileSchema = joi.object({
      fullName: joi.string().required(),
      phoneNumber: joi.string().min(10).max(11).pattern(/[0-9]/),
      birthday: joi.date().required(),
      address: joi.string().min(0).max(255),
    });
    validateRequest(req, profileSchema, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const validateRequestBody = {
  validateRegisterData,
  validateLoginData,
  validateChangePasswordData,
  validateResetPasswordData,
  validateProfileData,
};
