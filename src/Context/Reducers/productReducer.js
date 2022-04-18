import { SEARCH_PRODUCT, CLEAR_PRODUCT } from "../ActionTypes/productTypes";

const productReducer = (state = {}, action) => {
    switch(action.type) {
      case SEARCH_PRODUCT:
        console.log("Action: ", action);
        return { domain: action.payload.domain, products: action.payload.products };
      case CLEAR_PRODUCT:
        return {
          domain: "",
          products: []
        };
      default:
        return state;
    }
  };

  export default productReducer;