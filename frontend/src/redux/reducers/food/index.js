import * as types from "../../types/food";

const initialState = {
  createFoodState: {
    loading: false,
  },
  updateFoodState: {
    loading: false,
  },
  removeTempFoodState: {
    loading: false,
  },
  getFoodByIdState: {
    loading: false,
    data: {},
  },
  foodList: [],
  loadingGetListFood: false,
  totalPage: 0,
  totalRows: 0,
  // CLIENT
  foodListClient: [],
  isLimited: false,
  currentCount: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_FOOD:
      return {
        ...state,
        createFoodState: {
          loading: true,
        },
      };
    case types.CREATE_FOOD_SUCCEED:
      // const foodsCreated = actions.payload;
      // let temp = [...state.foodList];
      // temp = temp.concat(foodsCreated);
      return {
        ...state,
        createFoodState: {
          loading: false,
        },
        // foodList: temp,
        totalRows: state.totalRows + 1,
      };

    case types.CREATE_FOOD_FAIL:
      return {
        ...state,
        createFoodState: {
          loading: false,
        },
      };
    // UPDATE food
    case types.UPDATE_FOOD_BY_ID:
      return {
        ...state,
        updateFoodState: {
          loading: true,
        },
      };
    case types.UPDATE_FOOD_BY_ID_SUCCEED: {
      let newFood = actions.payload;
      let temp = [...state.foodList];
      const index = temp.findIndex((item) => item._id === newFood._id);
      temp[index] = newFood;

      return {
        ...state,
        foodList: temp,
        updateFoodState: {
          loading: false,
        },
      };
    }

    case types.UPDATE_FOOD_BY_ID_FAIL:
      return {
        ...state,
        updateFoodState: {
          loading: false,
        },
      };
    // Remove temp food
    case types.REMOVE_TEMP_BY_ID:
      return {
        ...state,
        removeTempFoodState: {
          loading: true,
        },
      };
    case types.REMOVE_TEMP_BY_ID_SUCCEED: {
      let temp = [...state.foodList];
      const { foodId, isRemoveTemp } = actions.payload;
      const index = temp.findIndex((item) => item._id === foodId);
      temp[index].isRemoveTemp = isRemoveTemp;

      return {
        ...state,
        foodList: temp,
        removeTempFoodState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_TEMP_BY_ID_FAIL:
      return {
        ...state,
        removeTempFoodState: {
          loading: false,
        },
      };
    // get list food per page
    case types.GET_LIST_FOOD_PER_PAGE:
      return {
        ...state,
        loadingGetListFood: true,
      };
    case types.GET_LIST_FOOD_PER_PAGE_SUCCEED: {
      let temp = state.currentCount + actions.payload.foods.length;
      return {
        ...state,
        loadingGetListFood: false,
        foodList: actions.payload.foods,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
        //client
        foodListClient: [...state.foodListClient, ...actions.payload.foods],
        isLimited: temp === actions.payload.totalRows,
        currentCount: temp,
      };
    }

    case types.RESET_TO_SEARCH_FOOD:
      return {
        ...state,
        foodListClient: [],
        currentCount: 0,
      };

    case types.GET_LIST_FOOD_PER_PAGE_FAIL:
      return {
        ...state,
        loadingGetListFood: false,
      };
    // get food by Id
    case types.GET_FOOD_BY_ID:
      return {
        ...state,
        getFoodByIdState: {
          loading: true,
        },
      };
    case types.GET_FOOD_BY_ID_SUCCEED:
      return {
        ...state,
        getFoodByIdState: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_FOOD_BY_ID_FAIL:
      return {
        ...state,
        getFoodByIdState: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
