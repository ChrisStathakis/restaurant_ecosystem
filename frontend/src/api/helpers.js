import axios from 'axios';
import {BASE_URL, REFRESH_ENDPOINT} from "./endpoints";
import {logout, refreshTokenAction} from "../my_store/actions/auth";
import  store from '../my_store/store'


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
     headers: {
        'Authorization': localStorage.getItem('access_token') ? "Bearer  " + localStorage.getItem('accessToken') : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

const {dispatch} = store;
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        if (!error.response){
            console.log('wrong');
            return Promise.reject({message: 'Wrong'})
        }

        // Prevent infinite loops early
        if (error.response.status === 401 && originalRequest.url === REFRESH_ENDPOINT) {
            window.location.href = '/login/';
            dispatch(logout())
            return Promise.reject({message: '401 Exception'});
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 &&
            error.response.statusText === "Unauthorized")
            {
                const refreshToken = localStorage.getItem('refreshToken');
                console.log('here!!', refreshToken);
                if (typeof refreshToken === 'undefined'){
                    console.log('unde');
                    logout();
                    return Promise.reject({message: 'logout'})
                }

                if (refreshToken){
                    console.log('continue');
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp);

                    if (tokenParts.exp > now) {
                        return axiosInstance
                        .post(REFRESH_ENDPOINT, {refresh: refreshToken})
                        .then((response) => {
                            localStorage.setItem('accessToken', response.data.access);
                            axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                            originalRequest.headers['Authorization'] = "Bearer " + response.data.access;
                            dispatch(refreshTokenAction(response.data.access))
                            return axiosInstance(originalRequest);
                        })
                        .catch(err => {
                            console.log(err)
                        });
                    }else{
                        console.log("Refresh token is expired", tokenParts.exp, now);
                        window.location.href = '/login/';
                    }
                }else{
                    console.log("Refresh token not available.");
                    window.location.href = '/login/';
                }
        }


      // specific error handling done elsewhere
      return Promise.reject(error);
  }
);


export default axiosInstance;