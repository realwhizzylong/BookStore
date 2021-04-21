import {
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL,
    BOOK_CREATE_SUCCESS,
    BOOK_CREATE_FAIL,
    BOOK_CREATE_RESET,
    BOOK_EDIT_SUCCESS,
    BOOK_EDIT_FAIL,
    BOOK_EDIT_RESET,
    BOOK_DELETE_SUCCESS,
    BOOK_DELETE_FAIL,
    MY_BOOKS_SUCCESS,
    MY_BOOKS_FAIL,
    MY_BOOKS_RESET
} from '../constants/bookConstants';

export const bookListReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case BOOK_LIST_SUCCESS:
            return {
                books: action.payload
            };
        case BOOK_LIST_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const bookDetailsReducer = (state = { book: { reviews: [] } }, action) => {
    switch (action.type) {
        case BOOK_DETAILS_SUCCESS:
            return {
                book: action.payload
            };
        case BOOK_DETAILS_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}

export const myBooksReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case MY_BOOKS_SUCCESS:
            return {
                books: action.payload
            };
        case MY_BOOKS_FAIL:
            return {
                error: action.payload
            };
        case MY_BOOKS_RESET:
            return {
                books: []
            }
        default:
            return state;
    }
}

export const bookCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_CREATE_SUCCESS:
            return {
                success: true,
                book: action.payload
            };
        case BOOK_CREATE_FAIL:
            return {
                error: action.payload
            };
        case BOOK_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const bookEditReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case BOOK_EDIT_SUCCESS:
            return {
                success: true
            };
        case BOOK_EDIT_FAIL:
            return {
                error: action.payload
            };
        case BOOK_EDIT_RESET:
            return {
                book: {}
            }
        default:
            return state;
    }
}

export const bookDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_DELETE_SUCCESS:
            return {
                success: true
            };
        case BOOK_DELETE_FAIL:
            return {
                error: action.payload
            };
        default:
            return state;
    }
}