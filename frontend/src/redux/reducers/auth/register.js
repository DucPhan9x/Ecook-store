import * as types from "../../types/auth";

const initialState = {
  data: {},
  error: {},
  loading: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.REGISTER:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case types.REGISTER_SUCCEED:
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    case types.REGISTER_FAIL:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
