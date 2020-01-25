import {CHANGE_BUTTON_TO_FALSE, CHANGE_BUTTON_TO_TRUE, DISH_ERROR, DISH_SUCCESS} from "../actions";

const initialState = {
    dishes: null,
    error: null,
    addEdit: true
};

const addReducer = (state = initialState, action) => {
    switch(action.type) {
        case DISH_SUCCESS:
            return {...state, dishes: action.data};
        case DISH_ERROR:
            return {...state, error: action.error};
        case CHANGE_BUTTON_TO_FALSE:
            return {...state, addEdit: false};
        case CHANGE_BUTTON_TO_TRUE:
            return {...state, addEdit: true};
        default:
            return state
    }
};

export default addReducer;