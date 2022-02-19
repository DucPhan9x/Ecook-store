import orderAPI from "api/orderAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/order";

const paypalRequest = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.PAYPAL_CREATE });
    orderAPI
      .paypalRequest(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.PAYPAL_CREATE_SUCCEED,
            payload: data,
          });
          res(result.link);
        } else {
          dispatch({ type: types.PAYPAL_CREATE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Payment create failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.PAYPAL_CREATE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const paypalPayment = (data) => {
  return (dispatch) => {
    dispatch({ type: types.PAYPAL_EXECUTE });
    orderAPI
      .paypalPayment(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.PAYPAL_EXECUTE_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            message: "Payment order successfully!",
          });
        } else {
          dispatch({ type: types.PAYPAL_EXECUTE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Payment order failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.PAYPAL_EXECUTE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export { paypalRequest, paypalPayment };
