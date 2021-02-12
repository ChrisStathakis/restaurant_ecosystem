import axios from 'axios';
import {LOGIN_URL} from '../api/endpoints';

class AuthService {
    login(username, password){
        return axios.post(LOGIN_URL, {
            username: username,
            password: password
        }).then((response)=>{
            if (response.data.access){
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        })
    }

    logout (){
        localStorage.removeItem("user")
    }
}


export default new AuthService();