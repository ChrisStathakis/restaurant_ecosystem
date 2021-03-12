import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, PRODUCT_CLASS_ENDPOINT, REFRESH_ENDPOINT} from './endpoints';
import store from '../views/my_store/store';
import { refreshAction } from '../views/my_store/actions/authActions';

const {dispatch} = store

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': AsyncStorage.getItem('accessToken') ? "Bearer " + AsyncStorage.getItem('accessToken'): null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    response=>response,
    error=>{
        const originalRequest = error.config;
        if (!error.response){
            console.log('error mothefucker')
            return Promise.reject({message: 'Wrong'})
        }

        if (error.response.status === 401 && originalRequest.url === REFRESH_ENDPOINT){
            dispatch(logout())
            return Promise.reject({'message': '401 Wrong refreshToken'})
        }

        if (error.response.data.code === "token_not_valid" && error.response.status === 401 && error.response.statusText === "Unauthorized"){
            const refreshToken = AsyncStorage.getItem('refreshToken')
            if ( typeof refreshToken === 'undefined'){
                dispatch(logout())
                return Promise.reject({'message': 'Refresh token is undentifdied'})
            }
            if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now()/1000);
                if (tokenParts.exp>now){
                    return axiosInstance.post(REFRESH_ENDPOINT, {refresh: refreshToken})
                        .then((response)=>{
                            AsyncStorage.setItem('accessToken', response.data.access);
                            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                            dispatch(refreshAction(response.data.access))
                            return axiosInstance(originalRequest)
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        AsyncStorage.removeItem('refreshToken');
                        AsyncStorage.removeItem('refreshToken');
                        AsyncStorage.removeItem('isLoggedIn');
                        dispatch(logout())
                    }
                }else{
                    console.log("Refresh token not available.");
                    /* window.location.href = '/login/';*/
                }
        }


      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);


export default axiosInstance;