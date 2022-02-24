import customerAPI from "api/customerAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/customer";

const banOrUnBanCustomer = ({ customerIds, isBanned }) => {
  return (dispatch) => {
    dispatch({ type: types.BAN_OR_UN_BAN_CUSTOMERS });
    customerAPI
      .banOrUnBanCustomer({ customerIds, isBanned })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.BAN_OR_UN_BAN_CUSTOMERS_SUCCEED,
            payload: { customerIds, isBanned },
          });
        } else {
          dispatch({ type: types.BAN_OR_UN_BAN_CUSTOMERS_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Ban(un-ban) customer failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.BAN_OR_UN_BAN_CUSTOMERS_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListCustomerPerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_CUSTOMERS });
    customerAPI
      .getListCustomers(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_CUSTOMERS_SUCCEED,
            payload: {
              customers: result.customers,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_CUSTOMERS_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get customer(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_CUSTOMERS_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getCustomerById = (customerId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_CUSTOMER_BY_ID });
    customerAPI
      .getCustomerById(customerId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_CUSTOMER_BY_ID_SUCCEED,
            payload: result.customer,
          });
        } else {
          dispatch({ type: types.GET_CUSTOMER_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get customer failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_CUSTOMER_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export { getCustomerById, getListCustomerPerPage, banOrUnBanCustomer };
