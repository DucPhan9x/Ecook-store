import { combineReducers } from "redux";
import {
  login,
  resetPassword,
  register,
  forgotPassword,
  loginAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  createNewAdminAccount,
} from "./auth";
import control from "./control";
import common from "./common";
import admin from "./admin";
import user from "./user";

export default combineReducers({
  login,
  register,
  forgotPassword,
  resetPassword,
  control,
  common,
  createNewAdminAccount,
  loginAdmin,
  forgotPasswordAdmin,
  resetPasswordAdmin,
  admin,
  user,
});
