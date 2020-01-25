import {ORDER_ERROR, ORDER_SUCCESS} from "../actions";

const initialState = {
    orders: null,
    error: null
};

const ordersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ORDER_SUCCESS:
            return {...state, orders: action.data};
        case ORDER_ERROR:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default ordersReducer;