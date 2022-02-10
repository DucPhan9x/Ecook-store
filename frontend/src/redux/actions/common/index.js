import authAPI from "api/authAPI";
import profileAPI from "api/profileAPI";
import useNotification from "hooks/useNotification";
import { setAccessToken, setRefreshAccessToken } from "utils/authUtils";
import * as types from "../../types/common";

const setToken = (token) => {
  setAccessToken(token);
  return (dispatch) => {
    dispatch({ type: types.SET_TOKEN, payload: token });
  };
};

const setRefreshToken = (token) => {
  setRefreshAccessToken(token);
  return (dispatch) => {
    dispatch({ type: types.SET_REFRESH_TOKEN, payload: token });
  };
};

const getToken = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_TOKEN });
    authAPI
      .getToken(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          res(result.data);
          dispatch({
            type: types.GET_TOKEN_SUCCEED,
            payload: result.data,
          });
        } else {
          dispatch({ type: types.GET_TOKEN_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get token fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_TOKEN_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

// profile
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

const updateProfile = (data) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_PROFILE });
    profileAPI
      .updateProfile(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_PROFILE_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            title: "Message",
            message: "Update profile information successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_PROFILE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update profile fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_PROFILE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateAvatar = (data) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_AVATAR });
    profileAPI
      .uploadAvatar(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_AVATAR_SUCCEED,
            payload: result.imageUrl,
          });
          useNotification.Success({
            title: "Message",
            message: "Update avatar successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_AVATAR_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update avatar fail!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: types.UPDATE_AVATAR_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const changePassword = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CHANGE_PASSWORD });
    profileAPI
      .changePassword(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CHANGE_PASSWORD_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            title: "Message",
            message: "Change password successfully!",
          });
        } else {
          dispatch({ type: types.CHANGE_PASSWORD_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Change password fail!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CHANGE_PASSWORD_FAIL });
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

export {
  setToken,
  setRefreshToken,
  getToken,
  getUserDetail,
  setUserDetail,
  updateProfile,
  updateAvatar,
  changePassword,
};
