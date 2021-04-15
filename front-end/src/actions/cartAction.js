import axios from 'axios';
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_ADDRESS, SAVE_PAYMENT_METHOD } from '../constants/cartConstants';

export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/books/${id}`);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data._id,
            title: data.title,
            author: data.author,
            image: data.image,
            price: data.price,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data));
}