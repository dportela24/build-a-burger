import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import burgerBuilderReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import uiReducer from './reducers/ui'
import authReducer from './reducers/auth'
import {saveBurgerState, loadBurgerState} from '../localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    ui: uiReducer,
    auth: authReducer
})

const persistedBurgerState = loadBurgerState();

const store = createStore(rootReducer, { burgerBuilder: persistedBurgerState}, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
    saveBurgerState(store.getState().burgerBuilder);
});

export default store;