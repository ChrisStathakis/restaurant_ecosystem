import  { combineReducers} from 'redux';

import productReducer from './productReducer';
import authReducer from './auth';
import messageReducer from './message';

export default combineReducers({
    productReducer,
    authReducer,
    messageReducer
})