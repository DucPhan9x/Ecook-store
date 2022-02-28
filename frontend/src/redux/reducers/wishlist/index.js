import * as types from "../../types/wishlist";

const initialState = {
  updateWishlistState: {
    loading: false,
  },
  getWishlistState: {
    loading: false,
    wishlists: [],
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        updateWishlistState: {
          loading: true,
        },
      };
    case types.UPDATE_WISHLIST_SUCCEED: {
      let temp = [...state.getWishlistState.wishlists];
      const itemId = actions.payload;
      if (itemId) {
        temp = temp.filter((i) => i._id !== itemId);
      }

      return {
        ...state,
        updateWishlistState: {
          loading: false,
        },
        getWishlistState: {
          wishlists: [...temp],
        },
      };
    }

    case types.UPDATE_WISHLIST_FAIL:
      return {
        ...state,
        updateWishlistState: {
          loading: false,
        },
      };

    // GET wishlist
    case types.GET_LIST_WISHLIST:
      return {
        ...state,
        getWishlistState: {
          loading: true,
        },
      };
    case types.GET_LIST_WISHLIST_SUCCEED:
      return {
        ...state,
        getWishlistState: {
          loading: false,
          wishlists: actions.payload,
        },
      };

    case types.GET_LIST_WISHLIST_FAIL:
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
