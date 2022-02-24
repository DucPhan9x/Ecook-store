import cartAPI from "api/cartAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/cart";

const createCartItems = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_CART });
    cartAPI
      .createNewCartItem(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_CART_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            message: "Add to cart successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_CART_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create cart items failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_CART_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListCartItem = (itemType) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_CART });
    cartAPI
      .getListCartItem(itemType)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_CART_SUCCEED,
            payload: result.cartItems,
          });
          useNotification.Success({
            message: "Get cart items successfully!",
          });
        } else {
          dispatch({ type: types.GET_LIST_CART_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get cart items failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_CART_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateCartItem = (cartItems) => {
  // cartItems: [{id: "",quantity:"" }]
  return (dispatch) => {
    dispatch({ type: types.UPDATE_CART });
    cartAPI
      .updateCartItem(cartItems)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_CART_SUCCEED,
            payload: cartItems,
          });
          useNotification.Success({
            title: "Message",
            message: `Update cart items successfully!`,
          });
        } else {
          dispatch({ type: types.UPDATE_CART_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update cart items failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_CART_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteCartItem = (cartItems) => {
  // cartItems: [id, id, id,...]
  return (dispatch) => {
    dispatch({ type: types.DELETE_CART });
    cartAPI
      .deleteCartItem(cartItems)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.DELETE_CART_SUCCEED,
            payload: cartItems,
          });
        } else {
          dispatch({ type: types.DELETE_CART_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete cart item(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.DELETE_CART_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteAllCartItem = (itemType) => {
  // cartItems: [id, id, id,...]
  // cartItems: [id, id, id,...]
  return (dispatch) => {
    dispatch({ type: types.DELETE_ALL_CART });
    cartAPI
      .deleteAllCartItem(itemType)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.DELETE_ALL_CART_SUCCEED,
            payload: itemType,
          });
        } else {
          dispatch({ type: types.DELETE_ALL_CART_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete all cart item failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.DELETE_ALL_CART_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createCartItems,
  updateCartItem,
  getListCartItem,
  deleteAllCartItem,
  deleteCartItem,
};
