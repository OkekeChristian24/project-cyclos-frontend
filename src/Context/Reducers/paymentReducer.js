import { MAKE_PAYMENT, GET_TX_DETAILS } from "../ActionTypes/paymentTypes";

const paymentReducer = (state, action) => {
    switch(action.type) {
      case MAKE_PAYMENT:
        return action.payload;
      case GET_TX_DETAILS:

        return;
        
      default:
        return state;
    }
  };

  export default paymentReducer;