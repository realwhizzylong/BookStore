import axios from 'axios';
import {
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,
    BOOK_CREATE_SUCCESS,
    BOOK_CREATE_FAIL,
    BOOK_EDIT_SUCCESS,
    BOOK_EDIT_FAIL,
    BOOK_DELETE_SUCCESS,
    BOOK_DELETE_FAIL,
    MY_BOOKS_SUCCESS,
    MY_BOOKS_FAIL,
    BOOK_REVIEW_SUCCESS,
    BOOK_REVIEW_FAIL
} from '../constants/bookConstants';

export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/books');
        dispatch({
            type: BOOK_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getBookDetails = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/books/${id}`);
        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getMyBooks = () => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/books/mybooks', config);
        dispatch({
            type: MY_BOOKS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: MY_BOOKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const createBook = (book) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/books', book, config);
        dispatch({
            type: BOOK_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_CREATE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const editBook = (book) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/books/${book._id}`, book, config);
        dispatch({
            type: BOOK_EDIT_SUCCESS,
        })
        dispatch({
            type: BOOK_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_EDIT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBook = (id) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/books/${id}`, config);
        dispatch({
            type: BOOK_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: BOOK_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addReview = (id, review) => async (dispatch, getState) => {
    try {
        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/books/${id}/reviews`, review, config);
        dispatch({
            type: BOOK_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: BOOK_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}