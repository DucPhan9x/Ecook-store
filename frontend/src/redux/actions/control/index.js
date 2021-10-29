import * as types from "../../types/control";

const toggleSidebar = () => {
  return (dispatch) => {
    dispatch({ type: types.TOGGLE_SIDEBAR });
  };
};

export { toggleSidebar };
