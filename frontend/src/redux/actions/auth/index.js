import authAPI from "api/authAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/auth";

const register = (data) => {
  return (dispatch) => {
    dispatch({ type: types.REGISTER });
    authAPI
      .register(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REGISTER_SUCCEED,
            payload: result.user,
          });
          useNotification.Success({
            title: "Message",
            message:
              "Register success, please check your mail to activate account.!",
          });
        } else {
          dispatch({ type: types.REGISTER_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Register fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.REGISTER_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const login = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.LOGIN_API });
    authAPI
      .login(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result.user);
          dispatch({
            type: types.LOGIN_API_SUCCEED,
            payload: result.user,
          });
        } else {
          dispatch({ type: types.LOGIN_API_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Login failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.LOGIN_API_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};
export { login, register };
