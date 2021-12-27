import * as types from "../../types/control";

const toggleSidebar = () => {
  return (dispatch) => {
    dispatch({ type: types.TOGGLE_SIDEBAR });
  };
};

const setScreenView = (input) => {
  localStorage.setItem("screenView", input);
  return (dispatch) => {
    dispatch({ type: types.SET_SCREEN_VIEW_HOMEPAGE, payload: input });
  };
};

export { toggleSidebar, setScreenView };
