import courseAPI from "api/courseAPI";
import orderAPI from "api/orderAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/order";

const paypalPayment = (data, res = () => {}) => {
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
            message: "Đã đặt hàng thành công!",
          });
          res(result);
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

const paypalPaymentCourse = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.PAYPAL_EXECUTE_COURSE });
    orderAPI
      .paypalPaymentCourse(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.PAYPAL_EXECUTE_COURSE_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            message: "Đã thanh toán thành công!",
          });
          res(result);
        } else {
          dispatch({ type: types.PAYPAL_EXECUTE_COURSE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Payment course failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.PAYPAL_EXECUTE_COURSE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const paymentRedirectMoney = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.PAYMENT_DIRECT_MONEY });
    orderAPI
      .paymentRedirectMoney(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.PAYMENT_DIRECT_MONEY_SUCCEED,
            payload: data,
          });
          useNotification.Success({
            message: "Đã đặt hàng thành công!",
          });
          res(result);
        } else {
          dispatch({ type: types.PAYMENT_DIRECT_MONEY_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Payment direct money failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.PAYMENT_DIRECT_MONEY_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getAllOrdersByAdministrator = (data) => {
  return (dispatch) => {
    dispatch({ type: types.GET_ALL_ORDERS_ADMINISTRATOR });
    orderAPI
      .getAllOrders(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_ALL_ORDERS_ADMINISTRATOR_SUCCEED,
            payload: {
              orders: result.orders,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_ALL_ORDERS_ADMINISTRATOR_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get orders failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_ORDERS_ADMINISTRATOR_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateStatusOrder = (data) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_STATUS_ORDER });
    orderAPI
      .updateStatusOrder(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_STATUS_ORDER_SUCCEED,
            payload: {
              order: result.order,
            },
          });
          useNotification.Success({
            message: "Update order successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_STATUS_ORDER_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update order failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_STATUS_ORDER_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

// for client
const getAllOrdersByClient = (data) => {
  return (dispatch) => {
    dispatch({ type: types.GET_ALL_ORDERS_CLIENT });
    orderAPI
      .getOrdersByClientId(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_ALL_ORDERS_CLIENT_SUCCEED,
            payload: {
              orders: result.orders,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_ALL_ORDERS_CLIENT_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get orders failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_ORDERS_CLIENT_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const checkExistInMyCourses = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.CHECK_EXIST_IN_MY_COURSES });
    courseAPI
      .checkExistMyCourse(data)
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: types.CHECK_EXIST_IN_MY_COURSES_SUCCEED,
          payload: {
            isExist: result.isExist,
          },
        });
        res(result);
      })
      .catch((error) => {
        dispatch({ type: types.CHECK_EXIST_IN_MY_COURSES_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  paypalPayment,
  paymentRedirectMoney,
  paypalPaymentCourse,
  getAllOrdersByAdministrator,
  getAllOrdersByClient,
  updateStatusOrder,
  checkExistInMyCourses,
};
