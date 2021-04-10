import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { bookListReducer, bookDetailsReducer } from './reducers/bookReducer';
import { loginReducer, registerReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    login: loginReducer,
    register: registerReducer,
    cart: cartReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    login: { userInfo: userInfoFromLocalStorage },
    cart: { cartItems: cartItemsFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;