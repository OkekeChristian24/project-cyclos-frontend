import { GET_TRANSACTIONS } from "../ActionTypes/transactionsTypes";

const transactionsReducer = (state = [], action) => {
    switch(action.type){
        case GET_TRANSACTIONS:
            return [
                ...action.payload.newState
            ];
        default:
            return state;
    }
};

export default transactionsReducer;