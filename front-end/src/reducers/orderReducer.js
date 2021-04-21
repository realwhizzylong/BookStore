import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAIL,
    PAY_ORDER_RESET,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    MY_ORDERS_RESET,
    SELLER_ORDERS_SUCCESS,
    SELLER_ORDERS_FAIL,
    SELLER_ORDERS_RESET
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_SUCCESS:
            return {
                success: true,
                order: action.payload
            };
        case ORDER_CREATE_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = { orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_SUCCESS:
            return {
                order: action.payload
            };
        case ORDER_DETAILS_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const payOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_ORDER_SUCCESS:
            return {
                success: true
            };
        case PAY_ORDER_FAIL:
            return {
                error: action.payload
            };
        case PAY_ORDER_RESET:
            return {};
        default:
            return state;
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_SUCCESS:
            return {
                orders: action.payload
            };
        case MY_ORDERS_FAIL:
            return {
                error: action.payload
            };
        case MY_ORDERS_RESET:
            return {
                orders: []
            }
        default:
            return state;
    }
}

export const sellerOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case SELLER_ORDERS_SUCCESS:
            return {
                orders: action.payload
            };
        case SELLER_ORDERS_FAIL:
            return {
                error: action.payload
            };
        case SELLER_ORDERS_RESET:
            return {
                orders: []
            }
        default:
            return state;
    }
}