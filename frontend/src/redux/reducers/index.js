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
import order from "./order";
import food from "./food";

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
  order,
  food,
});
