import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils'

const initialState = {
    token: null,
    userId: null,
    error: null,
    sendingRequest: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, sendingRequest: true })
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {error: action.error, sendingRequest: false });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {token: null, userId: null});
        default:
            return state;
    }
}

const authSuccess = (state, action) => {
    const newState = {
        token: action.token,
        userId: action.id,
        error: null,
        sendingRequest: false
    }

    return updateObject(state, newState);
}

export default reducer;