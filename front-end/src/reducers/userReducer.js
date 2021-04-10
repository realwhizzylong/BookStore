import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT
} from '../constants/userConstants';

export const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { userInfo: action.payload };
        case LOGIN_FAIL:
            return { error: action.payload };
        case LOGOUT:
            return {}
        default:
            return state;
    }
}

export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return { userInfo: action.payload };
        case REGISTER_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}