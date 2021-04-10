import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loginReducer, registerReducer } from './reducers/userReducer';

const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo' ? JSON.parse(localStorage.getItem('userInfo')) : null);

const initialState = {
    login: { userInfo: userInfoFromLocalStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;