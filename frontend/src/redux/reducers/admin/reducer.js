import * as types from "../../types/admin";

const initialState = {
  userDetail: {
    information: {},
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_INFORMATION_ADMIN:
      return {
        ...state,
        userDetail: { information: actions.payload, loading: false },
      };
    case types.GET_INFORMATION_ADMIN:
      return {
        ...state,
        userDetail: { loading: true },
      };
    case types.GET_INFORMATION_ADMIN_SUCCEED:
      return {
        ...state,
        userDetail: { information: actions.payload, loading: false },
      };
    case types.GET_INFORMATION_ADMIN_FAIL:
      return {
        ...state,
        userDetail: { loading: false },
      };
    default:
      return state;
  }
}
