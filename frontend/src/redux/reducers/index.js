import { combineReducers } from "redux";
import { login, resetPassword, register, forgotPassword } from "./auth";
import control from "./control";

export default combineReducers({
  login,
  register,
  forgotPassword,
  resetPassword,
  control,
});
