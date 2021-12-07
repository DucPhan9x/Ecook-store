import authAPI from "api/authAPI";
import * as types from "../../types/auth";

const login = () => {
  return (dispatch) => {
    dispatch({ type: types.GET_AUTH_USER });
    authAPI
      .getAuthUserDetails()
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_AUTH_USER_SUCCESS,
            payload: result.user,
          });
        } else {
          dispatch({ type: types.GET_AUTH_USER_FAIL });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_AUTH_USER_FAIL });
      });
  };
};
export { login };
