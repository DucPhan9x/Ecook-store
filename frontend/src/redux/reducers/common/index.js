import { getAccessToken, getAccessTokenSystem } from "utils/authUtils";
import * as types from "../../types/common";

const initialState = {
  token: getAccessToken(),
  tokenAdmin: getAccessTokenSystem(),
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
    default:
      return state;
  }
}
