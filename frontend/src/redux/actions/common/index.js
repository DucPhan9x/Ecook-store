import Cookies from "js-cookie";
import { setAccessToken, setAccessTokenSystem } from "utils/authUtils";
import * as types from "../../types/common";

const setToken = (token) => {
  setAccessToken(token);
  return (dispatch) => {
    dispatch({ type: types.SET_TOKEN, payload: token });
  };
};

const setAvatarURL = (url) => {
  Cookies.set("avatarURL", url);
  return (dispatch) => {
    dispatch({ type: types.SET_IMAGE_USER, payload: url });
  };
};

const setTokenAdmin = (token) => {
  setAccessTokenSystem(token);
  return (dispatch) => {
    dispatch({ type: types.SET_TOKEN_ADMIN, payload: token });
  };
};

const setAvatarURLAdmin = (url) => {
  Cookies.set("avatarURLSystem", url);
  return (dispatch) => {
    dispatch({ type: types.SET_IMAGE_USER_ADMIN, payload: url });
  };
};

export { setAvatarURL, setToken, setTokenAdmin, setAvatarURLAdmin };
