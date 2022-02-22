import * as types from "../../types/recipe";

const initialState = {
  createRecipeState: {
    loading: false,
  },
  updateRecipeState: {
    loading: false,
  },
  removeTempRecipeState: {
    loading: false,
  },
  getRecipeByIdState: {
    loading: false,
    data: {},
  },
  recipeList: [],
  loadingGetListRecipe: false,
  totalPage: 0,
  totalRows: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_RECIPE:
      return {
        ...state,
        createRecipeState: {
          loading: true,
        },
      };
    case types.CREATE_RECIPE_SUCCEED:
      const recipesCreated = actions.payload;
      let temp = [...state.recipeList];
      temp.push(recipesCreated);
      return {
        ...state,
        createRecipeState: {
          loading: false,
        },
        recipeList: temp,
        totalRows: state.totalRows + 1,
      };

    case types.CREATE_RECIPE_FAIL:
      return {
        ...state,
        createRecipeState: {
          loading: false,
        },
      };
    // UPDATE food
    case types.UPDATE_RECIPE_BY_ID:
      return {
        ...state,
        updateRecipeState: {
          loading: true,
        },
      };
    case types.UPDATE_RECIPE_BY_ID_SUCCEED: {
      let newRecipe = actions.payload;
      let temp = [...state.recipeList];
      const index = temp.findIndex((item) => item._id === newRecipe._id);
      temp[index] = newRecipe;

      return {
        ...state,
        recipeList: temp,
        updateRecipeState: {
          loading: false,
        },
      };
    }

    case types.UPDATE_RECIPE_BY_ID_FAIL:
      return {
        ...state,
        updateRecipeState: {
          loading: false,
        },
      };
    // Remove temp food
    case types.REMOVE_RECIPE_BY_ID:
      return {
        ...state,
        removeTempRecipeState: {
          loading: true,
        },
      };
    case types.REMOVE_RECIPE_BY_ID_SUCCEED: {
      let temp = [...state.recipeList];
      const recipeIds = actions.payload;

      return {
        ...state,
        recipeList: temp.filter((item) => !recipeIds.includes(item._id)),
        removeTempRecipeState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_RECIPE_BY_ID_FAIL:
      return {
        ...state,
        removeTempRecipeState: {
          loading: false,
        },
      };
    // get list food per page
    case types.GET_LIST_RECIPE_PER_PAGE:
      return {
        ...state,
        loadingGetListRecipe: true,
      };
    case types.GET_LIST_RECIPE_PER_PAGE_SUCCEED:
      return {
        ...state,
        loadingGetListRecipe: false,
        recipeList: actions.payload.recipes,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
      };

    case types.GET_LIST_RECIPE_PER_PAGE_FAIL:
      return {
        ...state,
        loadingGetListRecipe: false,
      };
    // get food by Id
    case types.GET_RECIPE_BY_ID:
      return {
        ...state,
        getRecipeByIdState: {
          loading: true,
        },
      };
    case types.GET_RECIPE_BY_ID_SUCCEED:
      return {
        ...state,
        getRecipeByIdState: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_RECIPE_BY_ID_FAIL:
      return {
        ...state,
        getRecipeByIdState: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
