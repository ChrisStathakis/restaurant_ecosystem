import axios from 'axios';
import authHeader from './auth-header';
import {TABLES_LIST_ENDPOINT, PRODUCT_LIST_ENDPOINT} from '../api/endpoints';

class UserService {
    getTablesContent(){
        return axios.get(TABLES_LIST_ENDPOINT,
            {headers: authHeader()})
    }
}

export default new UserService();