import { 
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_ITEM,
    DELETE_CART,
    GET_STORED_CART 
  } from "../ActionTypes/cartTypes";
  
const initCart = {
    totalQty: 0,
    totalPrice: 0,
    products: []
};
  

const cartReducer = (state = {}, action) => {
    switch(action.type){
        case GET_STORED_CART:
            return {
                ...action.payload.productCart
            };
        case ADD_TO_CART:
            if(typeof state.products === 'undefined'){

                const newState_ADD_TO_CART = {
                    ...state,
                    totalQty: action.payload.product.quantity,
                    totalPrice: (action.payload.product.quantity * action.payload.product.price),
                    products: [action.payload.product]
                };

                window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_ADD_TO_CART));
                return newState_ADD_TO_CART;
            }
            const index = state.products.findIndex(product => product.asin === action.payload.product.asin);
            if(index === -1){
                const newState_ADD_TO_CART = {
                    ...state,
                    totalQty: (state.totalQty + action.payload.product.quantity),
                    totalPrice: (state.totalPrice + (action.payload.product.quantity * action.payload.product.price)),
                    products: [action.payload.product, ...state.products]
                };
                window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_ADD_TO_CART));
                return newState_ADD_TO_CART;
            }
            return state;
        case UPDATE_CART:
            return {
                ...state,
                totalQty: action.payload.updatedState.totalQty,
                totalPrice: action.payload.updatedState.totalPrice,
                products: [...action.payload.updatedState.products]
            };

        case REMOVE_ITEM:
            const itemIndex = state.products.findIndex(product => product.asin === action.payload.asin);
            if(itemIndex === -1){
                return state;
            }
            const item = state.products[itemIndex];
            
            const newState_REMOVE_ITEM =  {
                ...state,
                totalQty: state.totalQty - item.quantity,
                totalPrice: state.totalPrice - (item.quantity * item.price),
                products: state.products.filter(product => product.asin !== item.asin)
            };
            window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_REMOVE_ITEM));
            return newState_REMOVE_ITEM;

        case DELETE_CART:
            window.localStorage.removeItem(process.env.REACT_APP_CART_NAME);
            return initCart;
        
        default:
            return state;
    }
};

export default cartReducer;