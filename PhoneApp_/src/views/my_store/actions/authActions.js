import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MMKVStorage  from 'react-native-mmkv-storage';
import { LOGIN_SUCCESS, REFRESH_TOKEN } from '../actionTypes';
import { LOGIN_URL } from '../endpoints';

const MMKV = new MMKVStorage.Loader().withInstanceID('tokens').initialize()


export const loginAction = (username, password) => (dispatch) => {
    return axios.post(LOGIN_URL, {
        username: username,
        password: password
    }).then(async(respData)=>{
        if (respData.status === 200) {
            const data = respData.data;
            
            await AsyncStorage.setItem('accessToken', data.access);
            await AsyncStorage.setItem('refreshToken', data.refresh)
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
}