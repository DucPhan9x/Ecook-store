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
import course from "./course";
import recipe from "./recipe";
import certification from "./certification";
import customer from "./customer";
import employee from "./employee";

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
  course,
  recipe,
  certification,
  customer,
  employee,
});
