import * as actionTypes from './actionTypes'
import * as uiActions from './ui'
import { clearIngredients } from './burgerBuilder'
import axios from '../../axios-orders'

export const placeOrderInit = () => {
    return {
        type: actionTypes.PLACE_ORDER_INIT
    }
}

export const placeOrderStart = () => {
    return {
        type: actionTypes.PLACE_ORDER_START
    }
}

export const placeOrderSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PLACE_ORDER_SUCCESS,
        orderId,
        orderData
    }
}

export const placeOrderFail = (error) => {
    return {
        type: actionTypes.PLACE_ORDER_FAIL,
        error
    }
}

export const placeOrder = (orderData, token, successToast, errorToast) => {
    return dispatch => {
        dispatch(placeOrderStart());

        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(placeOrderSuccess());
            dispatch(clearIngredients());
            dispatch(uiActions.addToast(successToast));
        })
        .catch(error => {
            dispatch(placeOrderFail(error));
            dispatch(uiActions.addToast(errorToast));
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token, userId, errorToast) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const query = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/orders.json' + query)
            .then( response => {
                const orders = [];
                for (const key in response.data) {
                    orders.push({
                        id: key,
                        price: response.data[key].price,
                        ingredients: response.data[key].ingredients,
                    })
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch( error => {
                dispatch(fetchOrdersFail(error));
                dispatch(uiActions.addToast(errorToast))
            })
    }
}