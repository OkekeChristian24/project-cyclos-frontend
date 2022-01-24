import { MAKE_PAYMENT, GET_TX_DETAILS } from "../ActionTypes/paymentTypes";

const stateSample = {
  
};

const paymentReducer = (state={}, action) => {
    switch(action.type) {
      case MAKE_PAYMENT:
        return {
          ...state,
          success: true,
          paymentID: action.payload.paymentID,
          orderID: action.payload.orderID,
          buyer: action.payload.buyer,
        };
      case GET_TX_DETAILS:

        return;
        
      default:
        return state;
    }
  };

  export default paymentReducer;