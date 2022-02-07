import Cookies from "js-cookie";
import * as types from "../../types/user";

const initialState = {
  userDetail: {
    information:
      (Cookies.get("profile") && JSON.parse(Cookies.get("profile"))) || {},
    loading: false,
    profile: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_INFORMATION_USER:
      Cookies.set("profile", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          information: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROFILE:
      return {
        ...state,
        userDetail: { ...state.userDetail, loading: true },
      };
    case types.GET_PROFILE_SUCCEED:
      Cookies.set("profile", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          profile: actions.payload,
          loading: false,
        },
      };
    case types.GET_PROFILE_FAIL:
      return {
        ...state,
        userDetail: { ...state.userDetail, loading: false },
      };
    default:
      return state;
  }
}
