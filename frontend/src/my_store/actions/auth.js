import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN, SET_MESSAGE} from "../actionTypes";

import AuthService from '../../services/auth.service';

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) =>{
            console.log('data', data)
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            console.log('action data', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });
            return Promise.resolve();
        },
        (error) => {
            const message = (error.response && error.response.data && error.response.data.message() || error.toString())
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch({
                type: SET_MESSAGE,
                message: message
            })
        }
    )
};

export const refreshTokenAction = (token) => (dispatch) => {
    dispatch({
        type: REFRESH_TOKEN,
        payload: token
    })
}

export const logout = () => (dispatch) =>{
    AuthService.logout();
    dispatch({
        type: LOGOUT
    })
}