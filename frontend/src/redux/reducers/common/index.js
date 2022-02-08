import {
  getAccessToken,
  getAccessTokenSystem,
  getRefreshAccessToken,
  getRefreshAccessTokenSystem,
} from "utils/authUtils";
import * as types from "../../types/common";

const initialState = {
  token: getAccessToken(),
  tokenAdmin: getAccessTokenSystem(),
  refreshToken: getRefreshAccessToken(),
  refreshTokenAdmin: getRefreshAccessTokenSystem(),
  loadingGetNewToken: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: actions.payload,
      };
    case types.SET_TOKEN_ADMIN:
      return {
        ...state,
        tokenAdmin: actions.payload,
      };
    case types.SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: actions.payload,
      };
    case types.SET_REFRESH_TOKEN_ADMIN:
      return {
        ...state,
        refreshTokenAdmin: actions.payload,
      };

    case types.GET_TOKEN:
      return {
        ...state,
        loadingGetNewToken: true,
      };
    case types.GET_TOKEN_SUCCEED:
      return {
        ...state,
        loadingGetNewToken: false,
      };
    case types.GET_TOKEN_FAIL:
      return {
        ...state,
        loadingGetNewToken: false,
      };
    default:
      return state;
  }
}
