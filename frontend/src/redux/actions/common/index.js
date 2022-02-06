import { setAccessToken, setAccessTokenSystem } from "utils/authUtils";
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

export { setToken, setTokenAdmin };
