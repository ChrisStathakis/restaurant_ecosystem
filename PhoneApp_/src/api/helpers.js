import {MMKV} from 'react-native-mmkv';
import axios from 'axios';
import {BASE_URL, PRODUCT_CLASS_ENDPOINT, REFRESH_ENDPOINT} from './endpoints';
import {store} from '../my_store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {logout} from "./tokensData";

const {dispatch} = store;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Authorization': "Bearer " ,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});




axiosInstance.interceptors.response.use(
    response=>response,
    async error=>{
        const originalRequest = error.config;
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (accessToken){
            axiosInstance.defaults.headers['Authorization'] = "Bearer " + accessToken;
        }

        if (!error.response){
            console.log('error mothefucker');
            return Promise.reject({message: 'Wrong'})
        }

        if (error.response.status === 401 && originalRequest.url === REFRESH_ENDPOINT){
            logout();
            return Promise.reject({'message': '401 Wrong refreshToken'})
        }

        if (error.response.data.code === "token_not_valid" && error.response.status === 401 && error.response.statusText === "Unauthorized"){

            if ( typeof refreshToken === 'undefined'){
                logout();
                return Promise.reject({'message': 'Refresh token is undentified'})
            }
            if (refreshToken){
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                const now = Math.ceil(Date.now()/1000);
                if (tokenParts.exp>now){
                    return axiosInstance.post(REFRESH_ENDPOINT, {refresh: refreshToken})
                        .then((response)=>{


                            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                            dispatch(refreshAction(response.data.access));
                            return axiosInstance(originalRequest)
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        logout()
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