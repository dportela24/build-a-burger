import * as actionTypes from './actionTypes'

export const addToast = (toast) => {
    return ({
        type: actionTypes.ADD_TOAST,
        toast
    })
}