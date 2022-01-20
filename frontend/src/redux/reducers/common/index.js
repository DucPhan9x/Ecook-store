import Cookies from "js-cookie";
import { getAccessToken } from "utils/authUtils";
import * as types from "../../types/common";

const initialState = {
  token: getAccessToken(),
  avatarURL: Cookies.get("avatarURL"),
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_TOKEN:
      return {
        ...state,
        token: actions.payload,
      };
    case types.SET_IMAGE_USER:
      return {
        ...state,
        avatarURL: actions.payload,
      };
    default:
      return state;
  }
}
