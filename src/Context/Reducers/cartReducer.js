import genRandomness from "../../Helpers/genRandomness";
import { PRECISION_FACTOR } from "../../utils/bignum";
import { 
    ADD_TO_CART,
    GET_STORED_CART,
    UPDATE_CART,
    DELETE_CART,
    UPDATE_ITEM,
    DUPLICATE_ITEM,
    UPDATE_ITEM_COLOR,
    UPDATE_ITEM_SIZE,
    REMOVE_ITEM
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
                    totalPrice: action.payload.product.quantity * action.payload.product.price,
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
                    totalPrice: ((state.totalPrice*PRECISION_FACTOR) + (action.payload.product.quantity * action.payload.product.price*PRECISION_FACTOR))/PRECISION_FACTOR,
                    products: [action.payload.product, ...state.products]
                };
                window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_ADD_TO_CART));
                return newState_ADD_TO_CART;
            }
            return state;

        case UPDATE_CART:

            const newState_UPDATE_CART = {
                ...state,
                totalQty: action.payload.updatedState.totalQty,
                totalPrice: action.payload.updatedState.totalPrice,
                products: [...action.payload.updatedState.products]
            };
            
            window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_UPDATE_CART));
            return newState_UPDATE_CART;


        case REMOVE_ITEM:
            const itemIndex = state.products.findIndex(product => product.id === action.payload.id);
            if(itemIndex === -1){
                return state;
            }

            const item = state.products[itemIndex];
            
            const newState_REMOVE_ITEM =  {
                ...state,
                totalQty: state.totalQty - item.quantity,
                totalPrice: ((state.totalPrice*PRECISION_FACTOR) - (item.quantity * item.price*PRECISION_FACTOR))/PRECISION_FACTOR,
                products: state.products.filter(product => product.id !== item.id)
            };

            window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_REMOVE_ITEM));
            
            return newState_REMOVE_ITEM;
        
        case UPDATE_ITEM:
            const updateItemIndex = state.products.findIndex(product => product.id === action.payload.product.id);
            if(updateItemIndex !== -1){
                const itemToUpdate = state.products[updateItemIndex];
                const filteredProducts = state.products.filter(product => product.id !== itemToUpdate.id);
                const filteredState = {
                    ...state,
                    totalQty: (state.totalQty - itemToUpdate.quantity),
                    totalPrice: ((state.totalPrice*PRECISION_FACTOR) - (itemToUpdate.quantity * itemToUpdate.price*PRECISION_FACTOR))/PRECISION_FACTOR,
                    products: filteredProducts
                };
                filteredState.products.splice(updateItemIndex, 0, action.payload.product);
                const newState_UPDATE_ITEM = {
                    ...filteredState,
                    totalQty: (filteredState.totalQty + action.payload.product.quantity),
                    totalPrice: ((filteredState.totalPrice*PRECISION_FACTOR) + (action.payload.product.quantity * action.payload.product.price*PRECISION_FACTOR))/PRECISION_FACTOR,
                    products: [...filteredState.products]
                };
                window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_UPDATE_ITEM));
                return newState_UPDATE_ITEM;
            }
            return state;

        case DUPLICATE_ITEM:
            const dupItemIndex = state.products.findIndex(product => product.id === action.payload.id);
            if(dupItemIndex === -1){
                return state;
            }
            const dupItem = {
                ...state.products[dupItemIndex],
                id: action.payload.newID
            };
            
            state.products.splice((dupItemIndex + 1), 0, dupItem);
            const newState_DUP_ITEM = {
                ...state,
                totalQty: (state.totalQty + dupItem.quantity),
                totalPrice: ((state.totalPrice*PRECISION_FACTOR) + (dupItem.quantity * dupItem.price*PRECISION_FACTOR))/PRECISION_FACTOR,
                products: [...state.products]
            };
            window.localStorage.setItem(process.env.REACT_APP_CART_NAME, JSON.stringify(newState_DUP_ITEM));
            return newState_DUP_ITEM;

        case UPDATE_ITEM_COLOR: 
            return;

        case UPDATE_ITEM_SIZE: 
             return;

        case DELETE_CART:
            window.localStorage.removeItem(process.env.REACT_APP_CART_NAME);
            return initCart;
        
        default:
            return state;
    }
};

export default cartReducer;