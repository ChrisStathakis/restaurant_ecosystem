import axios from 'axios';
import {MMKV} from 'react-native-mmkv';
import { LOGIN_SUCCESS, REFRESH_TOKEN, LOGOUT } from '../actionTypes';
import { LOGIN_URL } from '../endpoints';



export const loginAction = (username, password) => (dispatch) => {
    return axios.post(LOGIN_URL, {
        username: username,
        password: password
    }).then((respData)=>{
        if (respData.status === 200) {
            const data = respData.data;
            MMKV.set('accessToken', data.access);
            MMKV.set('refreshToken', data.refresh);
            MMKV.set('isLoggedIn', true);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })

        }
        
    })

}



export const refreshAction = (token) => (dispatch) => {
    return {
        type: REFRESH_TOKEN,
        payload: token
    }
};

export const logoutAction = () => (dispatch) =>{
    return{
        type: LOGOUT
    }
}