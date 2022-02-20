import foodAPI from "api/foodAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/food";

const createFood = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_FOOD });
    foodAPI
      .createFood(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_FOOD_SUCCEED,
            payload: result.foods,
          });
          useNotification.Success({
            message: "Create food successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_FOOD_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create food failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_FOOD_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateFoodById = (input) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_FOOD_BY_ID });
    foodAPI
      .updateFoodById(input)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_FOOD_BY_ID_SUCCEED,
            payload: result.food,
          });
          useNotification.Success({
            message: "Update food successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_FOOD_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update food failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_FOOD_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const removeTempFoodById = (foodId, isRemoveTemp) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_TEMP_BY_ID });
    foodAPI
      .updateStatusRemoveTempFood(foodId, isRemoveTemp)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REMOVE_TEMP_BY_ID_SUCCEED,
            payload: { foodId, isRemoveTemp },
          });
          useNotification.Success({
            title: "Message",
            message: `${isRemoveTemp ? "Lock" : "Unlock"} food ${foodId}`,
          });
        } else {
          dispatch({ type: types.REMOVE_TEMP_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Remove temp food failed!",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: types.REMOVE_TEMP_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListFoodPerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_FOOD_PER_PAGE });
    foodAPI
      .getListFoodPerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_FOOD_PER_PAGE_SUCCEED,
            payload: {
              foods: result.foods,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_FOOD_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get food(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_FOOD_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getFoodById = (foodId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_FOOD_BY_ID });
    foodAPI
      .getFoodById(foodId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_FOOD_BY_ID_SUCCEED,
            payload: result.food,
          });
        } else {
          dispatch({ type: types.GET_FOOD_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get food failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_FOOD_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createFood,
  updateFoodById,
  removeTempFoodById,
  getListFoodPerPage,
  getFoodById,
};
