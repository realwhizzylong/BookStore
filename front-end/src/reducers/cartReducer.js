import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x.id === item.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.id === existingItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload)
            }
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state;
    }
}