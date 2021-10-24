import * as types from "../constants";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.RESET_PASSWORD_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
