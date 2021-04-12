import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT
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