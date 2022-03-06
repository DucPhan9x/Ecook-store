import voucherAPI from "api/voucherAPI";
import useNotification from "hooks/useNotification";
import * as types from "../../types/voucher";

const createVoucher = (data) => {
  return (dispatch) => {
    dispatch({ type: types.CREATE_VOUCHER });
    voucherAPI
      .createVoucher(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.CREATE_VOUCHER_SUCCEED,
            payload: result.voucher,
          });
          useNotification.Success({
            message: "Create voucher successfully!",
          });
        } else {
          dispatch({ type: types.CREATE_VOUCHER_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Create voucher failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.CREATE_VOUCHER_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const updateVoucherById = (input, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_VOUCHER_BY_ID });
    voucherAPI
      .updateVoucherById(input)
      .then((response) => response.json())
      .then((result) => {
        res(result);
        if (result.status === 200) {
          dispatch({
            type: types.UPDATE_VOUCHER_BY_ID_SUCCEED,
            payload: result.voucher,
          });
          useNotification.Success({
            message: "Update voucher successfully!",
          });
        } else {
          dispatch({ type: types.UPDATE_VOUCHER_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Update voucher failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.UPDATE_VOUCHER_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const deleteVoucherById = (voucherIds) => {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_VOUCHER_BY_ID });
    voucherAPI
      .deleteVoucherById(voucherIds)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.REMOVE_VOUCHER_BY_ID_SUCCEED,
            payload: voucherIds,
          });
          useNotification.Success({
            title: "Message",
            message: `Delete voucher(s)`,
          });
        } else {
          dispatch({ type: types.REMOVE_VOUCHER_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Delete voucher failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.REMOVE_VOUCHER_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListVoucherPerPage = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_VOUCHER_PER_PAGE });
    voucherAPI
      .getListVoucherPerPage(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_VOUCHER_PER_PAGE_SUCCEED,
            payload: {
              vouchers: result.vouchers,
              totalPage: result.totalPage,
              totalRows: result.totalRows,
            },
          });
        } else {
          dispatch({ type: types.GET_LIST_VOUCHER_PER_PAGE_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get voucher(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_VOUCHER_PER_PAGE_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getListVoucherClient = (data, res = () => {}) => {
  return (dispatch) => {
    dispatch({ type: types.GET_LIST_VOUCHERS_CLIENT });
    voucherAPI
      .getListVoucherClient(data)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_LIST_VOUCHERS_CLIENT_SUCCEED,
            payload: {
              vouchers: result.vouchers,
            },
          });
          res(result.vouchers);
        } else {
          dispatch({ type: types.GET_LIST_VOUCHERS_CLIENT_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get voucher(s) failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_LIST_VOUCHERS_CLIENT_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

const getVoucherById = (voucherId) => {
  return (dispatch) => {
    dispatch({ type: types.GET_VOUCHER_BY_ID });
    voucherAPI
      .getVoucherById(voucherId)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          dispatch({
            type: types.GET_VOUCHER_BY_ID_SUCCEED,
            payload: result.voucher,
          });
        } else {
          dispatch({ type: types.GET_VOUCHER_BY_ID_FAIL });
          useNotification.Error({
            title: "Error",
            message: result.msg || "Get voucher failed!",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: types.GET_VOUCHER_BY_ID_FAIL });
        useNotification.Error({
          title: "Error",
          message: "Error connected to server!",
        });
      });
  };
};

export {
  createVoucher,
  updateVoucherById,
  getListVoucherPerPage,
  getVoucherById,
  deleteVoucherById,
  getListVoucherClient,
};
