import profileAPI from "api/profileAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/user";

const getUserDetail = (res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_PROFILE });
    profileAPI
      .getProfile()
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result.data);
          dispatch({
            type: types.GET_PROFILE_SUCCEED,
            payload: result.data,
          });
        } else {
          dispatch({ type: types.GET_PROFILE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get user detail fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_PROFILE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const setUserDetail = (data) => {
  return (dispatch) => {
    dispatch({ type: types.SET_INFORMATION_USER, payload: data });
  };
};

export { getUserDetail, setUserDetail };
