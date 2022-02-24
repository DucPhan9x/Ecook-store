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
      return {
        ...state,
        updateWishlistState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_WISHLIST: {
      // always REMOVE
      let temp = [...state.getWishlistState.wishlists];
      temp = temp.filter((i) => i._id !== actions.payload);
      return {
        ...state,
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
