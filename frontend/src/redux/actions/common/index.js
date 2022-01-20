import Cookies from "js-cookie";
import { setAccessToken } from "utils/authUtils";
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

export { setAvatarURL, setToken };
