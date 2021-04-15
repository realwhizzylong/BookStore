import { ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from '../constants/orderConstants';

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
