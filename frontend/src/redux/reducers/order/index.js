import * as types from "../../types/order";

const initialState = {
  paymentFood: {
    loading: false,
  },
  paymentCourse: {
    loading: false,
  },
  paymentRedirectMoney: {
    loading: false,
  },
  getOrdersByAdmin: {
    loading: false,
    orderList: [],
    totalRows: 0,
  },
  getOrdersByClient: {
    loading: false,
    totalRows: 0,
    orderList: [],
  },
  updateStatusOrder: {
    loading: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.PAYPAL_EXECUTE:
      return {
        ...state,
        paymentFood: {
          loading: true,
        },
      };
    case types.PAYPAL_EXECUTE_SUCCEED:
      return {
        ...state,
        paymentFood: {
          loading: false,
        },
      };

    case types.PAYPAL_EXECUTE_FAIL:
      return {
        ...state,
        paymentFood: {
          loading: false,
        },
      };

    //
    case types.PAYPAL_EXECUTE_COURSE:
      return {
        ...state,
        paymentCourse: {
          loading: true,
        },
      };
    case types.PAYPAL_EXECUTE_COURSE_SUCCEED:
      return {
        ...state,
        paymentCourse: {
          loading: false,
        },
      };

    case types.PAYPAL_EXECUTE_COURSE_FAIL:
      return {
        ...state,
        paymentCourse: {
          loading: false,
        },
      };
    //
    case types.PAYMENT_DIRECT_MONEY:
      return {
        ...state,
        paymentRedirectMoney: {
          loading: true,
        },
      };
    case types.PAYMENT_DIRECT_MONEY_SUCCEED:
      return {
        ...state,
        paymentRedirectMoney: {
          loading: false,
        },
      };

    case types.PAYMENT_DIRECT_MONEY_FAIL:
      return {
        ...state,
        paymentRedirectMoney: {
          loading: false,
        },
      };
    //
    case types.GET_ALL_ORDERS_ADMINISTRATOR:
      return {
        ...state,
        getOrdersByAdmin: {
          loading: true,
        },
      };
    case types.GET_ALL_ORDERS_ADMINISTRATOR_SUCCEED: {
      const { orders, totalRows } = actions.payload;
      return {
        ...state,
        getOrdersByAdmin: {
          loading: false,
          orderList: orders,
          totalRows: totalRows,
        },
      };
    }
    case types.GET_ALL_ORDERS_ADMINISTRATOR_FAIL:
      return {
        ...state,
        getOrdersByAdmin: {
          loading: false,
        },
      };
    //
    case types.GET_ALL_ORDERS_CLIENT:
      return {
        ...state,
        getOrdersByClient: {
          loading: true,
        },
      };
    case types.GET_ALL_ORDERS_CLIENT_SUCCEED: {
      const { orders, totalRows } = actions.payload;
      return {
        ...state,
        getOrdersByClient: {
          loading: false,
          orderList: orders,
          totalRows: totalRows,
        },
      };
    }
    case types.GET_ALL_ORDERS_CLIENT_FAIL:
      return {
        ...state,
        getOrdersByClient: {
          loading: false,
        },
      };
    //
    case types.UPDATE_STATUS_ORDER:
      return {
        ...state,
        updateStatusOrder: {
          loading: true,
        },
      };
    case types.UPDATE_STATUS_ORDER_SUCCEED: {
      const { order } = actions.payload;
      let temp = [...state.getOrdersByAdmin.orderList];
      const index = temp.findIndex((it) => it._id === order._id);
      temp[index] = order;
      return {
        ...state,
        updateStatusOrder: {
          loading: false,
        },
        getOrdersByClient: {
          loading: false,
          orderList: [...temp],
        },
      };
    }
    case types.UPDATE_STATUS_ORDER_FAIL:
      return {
        ...state,
        updateStatusOrder: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
