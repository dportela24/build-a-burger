import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as uiActions from './ui'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSucess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        id
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const setLogOutTimer = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isLoggingIn, errorToast) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAK2De3zac3PGh7fUu6XwTzvXWx7GQPVJs';

        if (isLoggingIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAK2De3zac3PGh7fUu6XwTzvXWx7GQPVJs';
        }

        axios.post(url, authData)
        .then( response => {
            const userId = response.data.localId;
            const token = response.data.idToken;
            const expiresIn = response.data.expiresIn;
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', userId);

            dispatch(authSucess(token, userId));
            dispatch(setLogOutTimer(parseInt(response.data.expiresIn, 10)))
        })
        .catch (error => {
            let errorMessage = error.response.data.error.message.replaceAll('_', ' ').toLowerCase();
            if (errorMessage.includes(':')) {
                errorMessage = errorMessage.split(':')[1].trim();
            }
            errorToast.title = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);

            dispatch(uiActions.addToast(errorToast))
            dispatch(authFail(error));
        })
    }
}

export const getAuthFromLocalStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');

        if (!token || !expirationDate || !userId || new Date() > expirationDate) {
            dispatch(logOut());
        } else {
            dispatch(authSucess(token, userId));
            dispatch(setLogOutTimer((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }
}