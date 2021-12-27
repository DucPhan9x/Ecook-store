import * as types from "../../types/control";

const initialState = {
  isOpenSidebar: true,
  screenView: localStorage.getItem("screenView") || "food_recipe",
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpenSidebar: !state.isOpenSidebar,
      };
    case types.SET_SCREEN_VIEW_HOMEPAGE:
      console.log(actions.payload);
      return {
        ...state,
        screenView: actions.payload,
      };
    default:
      return state;
  }
}
