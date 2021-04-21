import axios from 'axios';
import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_FAIL,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    SELLER_ORDERS_SUCCESS,
    SELLER_ORDERS_FAIL,
    DELIVER_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(order)
        const { data } = await axios.post('/orders', order, config);
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(id)
        const { data } = await axios.get(`/orders/${id}`, config);
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/orders/${id}/pay`, paymentResult, config);
        dispatch({
            type: PAY_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/orders/myorders', config);
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSellerOrders = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/orders/sellerorders', config);
        dispatch({
            type: SELLER_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SELLER_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/orders/${order._id}/deliver`, {}, config);
        dispatch({
            type: DELIVER_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELIVER_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}