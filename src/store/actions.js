import axiosOrders from "../axios-orders";

export const DISH_SUCCESS = 'DISH_SUCCESS';
export const DISH_ERROR = 'DISH_ERROR';

export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_ERROR = "ORDER_ERROR";

export const CHANGE_BUTTON_TO_FALSE = 'CHANGE_BUTTON_TO_FALSE';
export const CHANGE_BUTTON_TO_TRUE = 'CHANGE_BUTTON_TO_TRUE';

export const changeButtonToFalse = () => ({type: CHANGE_BUTTON_TO_FALSE});
export const changeButtonToTrue = () => ({type: CHANGE_BUTTON_TO_TRUE});
export const dishSuccess = data => ({type: DISH_SUCCESS, data});
export const dishError = error => ({type: DISH_ERROR, error});
export const orderSuccess = data => ({type: ORDER_SUCCESS, data});
export const orderError = error => ({type: ORDER_ERROR, error});

export const sentDataToBase = data => {
    return async dispatch => {
        try {
            await axiosOrders.post('/dishes.json', data);
            dispatch(getDataFromBase());
        } catch (error) {
            dispatch(dishError(error))
        }
    }
};

export const getDataFromBase = () => {
    return async dispatch => {
        try {
            const response = await axiosOrders.get('/dishes.json');
            dispatch(dishSuccess(response.data));
        } catch (error) {
            dispatch(dishError(error));
        }
    }
};


export const deleteDish = id => {
    return async dispatch => {
        try {
            await axiosOrders.delete('/dishes/' + id + '.json');
            dispatch(getDataFromBase());
        } catch (error) {
            dispatch(dishError(error));
        }
    }
};

export const buttonOnChangeToFalse = () => {
    return dispatch => {
        dispatch(changeButtonToFalse());
    }
};

export const buttonOnChangeToTrue = () => {
    return dispatch => {
        dispatch(changeButtonToTrue());
    }
};

export const editDish = (id, data) => {
    return async dispatch => {
        try {
            await axiosOrders.put('/dishes/' + id + '.json', data);
            dispatch(getDataFromBase());
        } catch (error) {
            dispatch(dishError(error));
        }
    }
};

export const getOrderDataFromBase = () => {
    return async dispatch => {
        try {
            const response = await axiosOrders.get('/orders.json');
            dispatch(orderSuccess(response.data));
        } catch (error) {
            dispatch(orderError(error));
        }
    }
};