import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utils'

const initialState = {
    toastList: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_TOAST): return updateObject(state, {toastList: state.toastList.concat(action.toast)});
        default: return state;
    }
}

export default reducer;