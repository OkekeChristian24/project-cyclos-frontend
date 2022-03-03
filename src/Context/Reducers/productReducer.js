import { SEARCH_PRODUCT, CLEAR_PRODUCT } from "../ActionTypes/productTypes";

const productReducer = (state, action) => {
    switch(action.type) {
      case SEARCH_PRODUCT:
        return action.payload;
      case CLEAR_PRODUCT:
        return [];
      default:
        return state;
    }
  };

  export default productReducer;