import * as types from "../../types/voucher";

const initialState = {
  createVoucherState: {
    loading: false,
  },
  updateVoucherState: {
    loading: false,
  },
  removeTempVoucherState: {
    loading: false,
  },
  getVoucherByIdState: {
    loading: false,
    data: {},
  },
  voucherList: [],
  loadingGetListVoucher: false,
  totalPage: 0,
  totalRows: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.CREATE_VOUCHER:
      return {
        ...state,
        createVoucherState: {
          loading: true,
        },
      };
    case types.CREATE_VOUCHER_SUCCEED:
      const vouchersCreated = actions.payload;
      let temp = [...state.voucherList];
      temp.push(vouchersCreated);
      return {
        ...state,
        createVoucherState: {
          loading: false,
        },
        voucherList: temp,
        totalRows: state.totalRows + 1,
      };

    case types.CREATE_VOUCHER_FAIL:
      return {
        ...state,
        createVoucherState: {
          loading: false,
        },
      };
    // UPDATE food
    case types.UPDATE_VOUCHER_BY_ID:
      return {
        ...state,
        updateVoucherState: {
          loading: true,
        },
      };
    case types.UPDATE_VOUCHER_BY_ID_SUCCEED: {
      let newVoucher = actions.payload;
      let temp = [...state.voucherList];
      const index = temp.findIndex((item) => item._id === newVoucher._id);
      temp[index] = newVoucher;

      return {
        ...state,
        voucherList: temp,
        updateVoucherState: {
          loading: false,
        },
      };
    }

    case types.UPDATE_VOUCHER_BY_ID_FAIL:
      return {
        ...state,
        updateVoucherState: {
          loading: false,
        },
      };
    // Remove temp food
    case types.REMOVE_VOUCHER_BY_ID:
      return {
        ...state,
        removeTempVoucherState: {
          loading: true,
        },
      };
    case types.REMOVE_VOUCHER_BY_ID_SUCCEED: {
      let temp = [...state.voucherList];
      const voucherIds = actions.payload;

      return {
        ...state,
        voucherList: temp.filter((item) => !voucherIds.includes(item._id)),
        removeTempVoucherState: {
          loading: false,
        },
      };
    }

    case types.REMOVE_VOUCHER_BY_ID_FAIL:
      return {
        ...state,
        removeTempVoucherState: {
          loading: false,
        },
      };
    // get list food per page
    case types.GET_LIST_VOUCHER_PER_PAGE:
      return {
        ...state,
        loadingGetListVoucher: true,
      };
    case types.GET_LIST_VOUCHER_PER_PAGE_SUCCEED:
      return {
        ...state,
        loadingGetListVoucher: false,
        voucherList: actions.payload.vouchers,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
      };

    case types.GET_LIST_VOUCHER_PER_PAGE_FAIL:
      return {
        ...state,
        loadingGetListVoucher: false,
      };
    // get food by Id
    case types.GET_VOUCHER_BY_ID:
      return {
        ...state,
        getVoucherByIdState: {
          loading: true,
        },
      };
    case types.GET_VOUCHER_BY_ID_SUCCEED:
      return {
        ...state,
        getVoucherByIdState: {
          loading: false,
          data: actions.payload,
        },
      };

    case types.GET_VOUCHER_BY_ID_FAIL:
      return {
        ...state,
        getVoucherByIdState: {
          loading: false,
        },
      };

    default:
      return state;
  }
}
