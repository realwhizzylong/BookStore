import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/users/login', { email, password }, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/users/register', { name, email, password }, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: LOGOUT
    })
}

export const getUserDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/users/${id}`);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}