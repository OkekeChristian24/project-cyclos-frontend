import { SEARCH_PRODUCT } from "../ActionTypes/productTypes";

const productReducer = (state, action) => {
    switch(action.type) {
      case SEARCH_PRODUCT:
        return action.payload;
        
      default:
        return state;
    }
  };

  export default productReducer;