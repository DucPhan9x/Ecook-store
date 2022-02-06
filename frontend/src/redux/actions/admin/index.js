import adminAPI from "api/adminAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/admin";

const getUserDetailAdmin = (data) => {
  return (dispatch) => {
    dispatch({ type: types.GET_INFORMATION_ADMIN });
    adminAPI
      .getUserDetailAdmin(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_INFORMATION_ADMIN_SUCCEED,
            payload: result.data,
          });
        } else {
          dispatch({ type: types.GET_INFORMATION_ADMIN_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get user detail fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_INFORMATION_ADMIN_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const setUserDetailAdmin = (data) => {
  return (dispatch) => {
    dispatch({ type: types.SET_INFORMATION_ADMIN, payload: data });
  };
};

export { getUserDetailAdmin, setUserDetailAdmin };
