import orderAPI from "api/orderAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/order";

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

export { paypalPayment };
