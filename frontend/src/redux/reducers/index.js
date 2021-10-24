import { combineReducers } from "redux";
import login from "./login";
import register from "./register";
import forgotPassword from "./forgotPassword";
import resetPassword from "./resetPassword";

export default combineReducers({
  login,
  register,
  forgotPassword,
  resetPassword,
});
