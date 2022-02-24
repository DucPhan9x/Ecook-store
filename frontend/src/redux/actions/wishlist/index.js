import wishlistAPI from "api/wishlistAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/wishlist";

const getListWishlist = (itemType) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_WISHLIST });
    wishlistAPI
      .getWishlist(itemType)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_WISHLIST_SUCCEED,
            payload: result.wishlists,
          });
        } else {
          dispatch({ type: types.GET_LIST_WISHLIST_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get wishlist failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_WISHLIST_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateWishlist = (data) => {
  //{itemId, itemType}
  return (dispatch) => {
    dispatch({ type: types.UPDATE_WISHLIST });
    wishlistAPI
      .updateWishlist(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_WISHLIST_SUCCEED,
          });
          useNotification.Success({
            title: "Message",
            message: result.isRemoveStatus
              ? "Đã xóa khỏi danh sách yêu thích"
              : "Đã thêm vào danh sách yêu thích",
          });
        } else {
          dispatch({ type: types.UPDATE_WISHLIST_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_WISHLIST_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export const removeFavoriteItem = (itemId) => {
  return (dispatch) =>
    dispatch({ type: types.REMOVE_WISHLIST, payload: itemId });
};

export { getListWishlist, updateWishlist };
