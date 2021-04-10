import axios from 'axios';
import {
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL
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