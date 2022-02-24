import * as types from "../../types/cart";

const initialState = {
  createCartItemsState: {
    loading: false,
  },
  updateCartItemState: {
    loading: false,
  },
  getListCartItemState: {
    loading: false,
    cartItems: [],
  },
  deleteAllCartItemState: {
    loading: false,
  },
  deleteCartItemState: {
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_CART:
      return {
        ...state,
        createCartItemsState: {
          loading: true,
        },
      };
    case types.CREATE_CART_SUCCEED: {
      return {
        ...state,
        createCartItemsState: {
          loading: false,
        },
      };
    }
    case types.CREATE_CART_FAIL:
      return {
        ...state,
        createCartItemsState: {
          loading: false,
        },
      };
    // UPDATE cart
    case types.UPDATE_CART:
      return {
        ...state,
        updateCartItemState: {
          loading: true,
        },
      };
    case types.UPDATE_CART_SUCCEED: {
      let data = actions.payload; // [{id: "",quantity:"" }]
      let temp = [...state.getListCartItemState.cartItems];
      temp = temp.map((i, idx) => ({
        ...i,
        quantity: data[idx]?.quantity,
      }));

      return {
        ...state,
        updateCartItemState: {
          loading: false,
        },
        getListCartItemState: {
          cartItems: [...temp],
        },
      };
    }

    case types.UPDATE_CART_FAIL:
      return {
        ...state,
        updateCartItemState: {
          loading: false,
        },
      };
    //
    case types.DELETE_CART:
      return {
        ...state,
        deleteCartItemState: {
          loading: true,
        },
      };
    case types.DELETE_CART_SUCCEED: {
      const itemIds = actions.payload;
      let temp = [...state.getListCartItemState.cartItems];
      temp = temp.filter((item) => !itemIds(item._id));

      return {
        ...state,
        deleteCartItemState: {
          loading: false,
        },
        getListCartItemState: {
          cartItems: [...temp],
        },
      };
    }

    case types.DELETE_CART_FAIL:
      return {
        ...state,
        deleteCartItemState: {
          loading: false,
        },
      };
    //
    case types.DELETE_ALL_CART:
      return {
        ...state,
        deleteAllCartItemState: {
          loading: true,
        },
      };
    case types.DELETE_ALL_CART_SUCCEED: {
      return {
        ...state,
        deleteAllCartItemState: {
          loading: false,
        },
        getListCartItemState: {
          cartItems: [],
        },
      };
    }
    case types.DELETE_ALL_CART_FAIL:
      return {
        ...state,
        deleteAllCartItemState: {
          loading: false,
        },
      };
    //
    case types.GET_LIST_CART:
      return {
        ...state,
        getListCartItemState: {
          loading: true,
        },
      };
    case types.GET_LIST_COURSE_PER_PAGE_SUCCEED:
      return {
        ...state,
        getListCartItemState: {
          loading: false,
          cartItems: actions.payload,
        },
      };

    case types.GET_LIST_COURSE_PER_PAGE_FAIL:
      return {
        ...state,
        getListCartItemState: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
