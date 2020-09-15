import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utils'

const initialState = {
    orders: [],
    sendingRequest: false,
    requestFullfilled: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PLACE_ORDER_INIT:     return updateObject(state, { requestFullfilled: false});
        case actionTypes.PLACE_ORDER_START:    return updateObject(state, {sendingRequest: true});
        case actionTypes.PLACE_ORDER_SUCCESS:  return updateObject(state, {sendingRequest: false, requestFullfilled: true});
        case actionTypes.PLACE_ORDER_FAIL:     return updateObject(state, {sendingRequest: false});
        case actionTypes.FETCH_ORDERS_START:   return updateObject(state, {sendingRequest: true});
        case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, { orders: action.orders, sendingRequest: false })
        case actionTypes.FETCH_ORDERS_FAIL:    return updateObject(state, {sendingRequest: false});
        default: return state;
    } 
};

export default reducer;