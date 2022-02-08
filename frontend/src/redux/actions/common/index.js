import authAPI from "api/authAPI";
import useNotification from "hooks/useNotification";
import {
  setAccessToken,
  setAccessTokenSystem,
  setRefreshAccessToken,
  setRefreshAccessTokenSystem,
} from "utils/authUtils";
import * as types from "../../types/common";

const setToken = (token) => {
  setAccessToken(token);
  return (dispatch) => {
    dispatch({ type: types.SET_TOKEN, payload: token });
  };
};

const setTokenAdmin = (token) => {
  setAccessTokenSystem(token);
  return (dispatch) => {
    dispatch({ type: types.SET_TOKEN_ADMIN, payload: token });
  };
};

const setRefreshToken = (token) => {
  setRefreshAccessToken(token);
  return (dispatch) => {
    dispatch({ type: types.SET_REFRESH_TOKEN, payload: token });
  };
};

const setRefreshTokenAdmin = (token) => {
  setRefreshAccessTokenSystem(token);
  return (dispatch) => {
    dispatch({ type: types.SET_REFRESH_TOKEN_ADMIN, payload: token });
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

export {
  setToken,
  setTokenAdmin,
  setRefreshToken,
  setRefreshTokenAdmin,
  getToken,
};
