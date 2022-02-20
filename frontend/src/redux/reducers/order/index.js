import * as types from "../../types/order";

const initialState = {
  paymentFood: {
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
    default:
      return state;
  }
}
