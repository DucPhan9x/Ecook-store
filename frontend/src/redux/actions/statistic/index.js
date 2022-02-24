import statisticAPI from "api/statisticAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/statistic";

const getRevenuesInfo = (getInfoBy, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_REVENUES_INFO });
    statisticAPI
      .getRevenuesInfo(getInfoBy)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_REVENUES_INFO_SUCCEED,
            payload: result.revenues,
          });
          res(result.revenues);
        } else {
          dispatch({ type: types.GET_REVENUES_INFO_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get revenues failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_REVENUES_INFO_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getGeneralInfo = (res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_GENERAL_INFO });
    statisticAPI
      .getGeneralInfo()
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          const {
            totalOrders,
            totalCustomers,
            totalCourses,
            totalRevenues,
            popularCourses,
            popularFoods,
            popularRecipe,
          } = result;
          dispatch({
            type: types.GET_GENERAL_INFO_SUCCEED,
            payload: {
              totalOrders,
              totalCustomers,
              totalCourses,
              totalRevenues,
              popularCourses,
              popularFoods,
              popularRecipe,
            },
          });
          res({
            totalOrders,
            totalCustomers,
            totalCourses,
            totalRevenues,
            popularCourses,
            popularFoods,
            popularRecipe,
          });
        } else {
          dispatch({ type: types.GET_GENERAL_INFO_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get general information failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_GENERAL_INFO_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export { getRevenuesInfo, getGeneralInfo };
