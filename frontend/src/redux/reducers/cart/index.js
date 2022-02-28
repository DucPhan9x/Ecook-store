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
  buyNowState: {
    loading: false,
  },
  statusModalCart: false,
  itemIdBuyNow: "",
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
    case types.RESET_ITEM_BUY_NOW:
      return {
        ...state,
        itemIdBuyNow: "",
      };

    //
    case types.BUY_NOW:
      const itemId = actions.payload;
      let temp = [...state.getListCartItemState.cartItems];
      const index = temp.findIndex((item) => item.itemId === itemId);
      if (temp[index]) {
        temp[index].isCheckbox = true;
      }

      return {
        ...state,
        statusModalCart: true,
        getListCartItemState: {
          cartItems: [...temp],
        },
        itemIdBuyNow: itemId,
      };
    case types.TOGGLE_MODAL_CART:
      return {
        ...state,
        statusModalCart: actions.payload,
        itemIdBuyNow: "",
      };
    //

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
      temp = temp.filter((item) => !itemIds.includes(item._id));

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
    case types.GET_LIST_CART_SUCCEED:
      const itemIdBuyNow = state.itemIdBuyNow;

      return {
        ...state,
        getListCartItemState: {
          loading: false,
          cartItems: actions.payload?.map((item) => ({
            ...item,
            isCheckbox: itemIdBuyNow === item.itemId,
          })),
        },
      };

    case types.GET_LIST_CART_FAIL:
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
