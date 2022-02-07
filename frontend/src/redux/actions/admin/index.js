import profileAPI from "api/profileAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/admin";

const getUserDetailAdmin = (res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_PROFILE_ADMIN });
    profileAPI
      .getProfileAdmin()
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result.data);
          dispatch({
            type: types.GET_PROFILE_ADMIN_SUCCEED,
            payload: result.data,
          });
        } else {
          dispatch({ type: types.GET_PROFILE_ADMIN_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get user detail fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_PROFILE_ADMIN_FAIL });
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
