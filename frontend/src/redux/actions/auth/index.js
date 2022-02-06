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
              "Register success, please check your mail to activate account!",
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

const loginAdmin = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_LOGIN_API });
    authAPI
      .loginAdmin(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result.user);
          dispatch({
            type: types.ADMIN_LOGIN_API,
            payload: result.user,
          });
        } else {
          dispatch({ type: types.ADMIN_LOGIN_API_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Login failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.ADMIN_LOGIN_API_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const sendResetCode = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.FORGOT_PASSWORD });
    authAPI
      .sendResetCode(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result);
          dispatch({
            type: types.FORGOT_PASSWORD_SUCCEED,
          });
        } else {
          dispatch({ type: types.FORGOT_PASSWORD_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Send reset code failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.FORGOT_PASSWORD_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const resetPassword = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.RESET_PASSWORD });
    authAPI
      .resetPassword(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result);
          dispatch({
            type: types.RESET_PASSWORD_SUCCEED,
            payload: result,
          });
        } else {
          dispatch({ type: types.RESET_PASSWORD_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Reset password failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.RESET_PASSWORD_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const createNewAdminAccount = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_NEW_ADMIN_ACCOUNT });
    authAPI
      .createNewAdminAccount(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_NEW_ADMIN_ACCOUNT_SUCCEED,
            payload: result.user,
          });
          useNotification.Success({
            title: "Message",
            message:
              "Create successfully, please check your mail to activate account!",
          });
        } else {
          dispatch({ type: types.CREATE_NEW_ADMIN_ACCOUNT_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Register fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_NEW_ADMIN_ACCOUNT_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const resetPasswordAdmin = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_RESET_PASSWORD });
    authAPI
      .resetPassword(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result);
          dispatch({
            type: types.ADMIN_RESET_PASSWORD_SUCCEED,
            payload: result,
          });
        } else {
          dispatch({ type: types.ADMIN_RESET_PASSWORD_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Reset password failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.ADMIN_RESET_PASSWORD_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  login,
  register,
  sendResetCode,
  resetPassword,
  loginAdmin,
  createNewAdminAccount,
  resetPasswordAdmin,
};
