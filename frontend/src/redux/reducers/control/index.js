import * as types from "../../types/control";

const initialState = {
  isOpenSidebar: true,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpenSidebar: !state.isOpenSidebar,
      };
    default:
      return state;
  }
}
