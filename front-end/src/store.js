import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { bookListReducer, bookDetailsReducer, myBooksReducer, bookCreateReducer, bookEditReducer, bookDeleteReducer, bookReviewReducer, bookSoldReducer } from './reducers/bookReducer';
import { loginReducer, registerReducer, userDetailsReducer, userProfileReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDetailsReducer, myOrdersReducer, payOrderReducer, sellerOrdersReducer, deliverOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    bookList: bookListReducer,
    bookDetails: bookDetailsReducer,
    myBooks: myBooksReducer,
    bookCreate: bookCreateReducer,
    bookEdit: bookEditReducer,
    bookDelete: bookDeleteReducer,
    bookReview: bookReviewReducer,
    bookSold: bookSoldReducer,
    login: loginReducer,
    register: registerReducer,
    userDetails: userDetailsReducer,
    userProfile: userProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    myOrders: myOrdersReducer,
    payOrder: payOrderReducer,
    sellerOrders: sellerOrdersReducer,
    deliverOrder: deliverOrderReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};

const initialState = {
    login: {
        userInfo: userInfoFromLocalStorage
    },
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage,
        paymentMethod: paymentMethodFromLocalStorage
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;