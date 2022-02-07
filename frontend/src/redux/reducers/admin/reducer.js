import Cookies from "js-cookie";
import * as types from "../../types/admin";

const initialState = {
  userDetail: {
    information: JSON.parse(Cookies.get("profileAdmin")) || {},
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_INFORMATION_ADMIN:
      Cookies.set("profileAdmin", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: { information: actions.payload, loading: false },
      };
    case types.GET_PROFILE_ADMIN:
      return {
        ...state,
        userDetail: { loading: true },
      };
    case types.GET_PROFILE_ADMIN_SUCCEED:
      Cookies.set("profileAdmin", JSON.stringify(actions.payload));
      return {
        ...state,
        userDetail: { information: actions.payload, loading: false },
      };
    case types.GET_PROFILE_ADMIN_FAIL:
      return {
        ...state,
        userDetail: { loading: false },
      };
    default:
      return state;
  }
}
