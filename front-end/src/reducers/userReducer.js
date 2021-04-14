import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
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

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_SUCCESS:
            return { user: action.payload };
        case USER_DETAILS_FAIL:
            return { error: action.payload };
        default:
            return state;
    }
}