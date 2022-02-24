import * as types from "../../types/customer";

const initialState = {
  banUnBanCustomers: {
    loading: false,
  },
  getCustomerById: {
    loading: false,
  },
  customerList: [],
  loadingGetListCustomer: false,
  totalPage: 0,
  totalRows: 0,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    //ban/unBan customer
    case types.BAN_OR_UN_BAN_CUSTOMERS:
      return {
        ...state,
        banUnBanCustomers: {
          loading: true,
        },
      };
    case types.BAN_OR_UN_BAN_CUSTOMERS_SUCCEED: {
      let temp = [...state.customerList];
      const { customerIds, isBanned } = actions.payload;
      temp.forEach((item) => {
        if (customerIds.includes(item._id)) {
          item.isRemoved = isBanned;
        }
      });

      return {
        ...state,
        customerList: temp,
        banUnBanCustomers: {
          loading: false,
        },
      };
    }

    case types.BAN_OR_UN_BAN_CUSTOMERS_FAIL:
      return {
        ...state,
        banUnBanCustomers: {
          loading: false,
        },
      };
    // get list CUSTOMER per page
    case types.GET_LIST_CUSTOMERS:
      return {
        ...state,
        loadingGetListCustomer: true,
      };
    case types.GET_LIST_CUSTOMERS_SUCCEED:
      return {
        ...state,
        loadingGetListCustomer: false,
        customerList: actions.payload.customers,
        totalPage: actions.payload.totalPage,
        totalRows: actions.payload.totalRows,
      };

    case types.GET_LIST_CUSTOMERS_FAIL:
      return {
        ...state,
        loadingGetListCustomer: false,
      };
    // get customer by Id
    case types.GET_CUSTOMER_BY_ID:
      return {
        ...state,
        getCustomerById: {
          loading: true,
        },
      };
    case types.GET_CUSTOMER_BY_ID_SUCCEED:
      return {
        ...state,
        getCustomerById: {
          loading: false,
        },
      };

    case types.GET_CUSTOMER_BY_ID_FAIL:
      return {
        ...state,
        getCustomerById: {
          loading: false,
        },
      };
    default:
      return state;
  }
}
