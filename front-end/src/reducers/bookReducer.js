import {
    BOOK_LIST_SUCCESS,
    BOOK_LIST_FAIL,
    BOOK_DETAILS_SUCCESS,
    BOOK_DETAILS_FAIL
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