import recipeAPI from "api/recipeAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/recipe";

const createRecipe = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_RECIPE });
    recipeAPI
      .createRecipe(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_RECIPE_SUCCEED,
            payload: result.recipe,
          });
          useNotification.Success({
            message: "Create recipe successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_RECIPE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create recipe failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_RECIPE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateRecipeById = (input) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_RECIPE_BY_ID });
    recipeAPI
      .updateRecipeById(input)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_RECIPE_BY_ID_SUCCEED,
            payload: result.recipe,
          });
          useNotification.Success({
            message: "Update recipe successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_RECIPE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update recipe failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_RECIPE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteRecipeById = (recipeIds) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_RECIPE_BY_ID });
    recipeAPI
      .deleteRecipeById(recipeIds)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REMOVE_RECIPE_BY_ID_SUCCEED,
            payload: recipeIds,
          });
          useNotification.Success({
            title: "Message",
            message: `Delete recipe(s)`,
          });
        } else {
          dispatch({ type: types.REMOVE_RECIPE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete recipe failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.REMOVE_RECIPE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListRecipePerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE });
    recipeAPI
      .getListRecipePerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_RECIPE_PER_PAGE_SUCCEED,
            payload: {
              recipes: result.recipes,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get recipe(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListRecipeByInstructor = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE });
    recipeAPI
      .getListRecipeByInstructor(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_RECIPE_PER_PAGE_SUCCEED,
            payload: {
              recipes: result.recipes,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get recipe(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_RECIPE_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getRecipeById = (recipeId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_RECIPE_BY_ID });
    recipeAPI
      .getRecipeById(recipeId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_RECIPE_BY_ID_SUCCEED,
            payload: result.recipe,
          });
        } else {
          dispatch({ type: types.GET_RECIPE_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get recipe failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_RECIPE_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createRecipe,
  updateRecipeById,
  getListRecipePerPage,
  getRecipeById,
  deleteRecipeById,
  getListRecipeByInstructor,
};
