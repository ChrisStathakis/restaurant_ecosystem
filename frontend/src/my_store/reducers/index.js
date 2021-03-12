import  { combineReducers} from 'redux';

import productReducer from './productReducer';
import authReducer from './auth';
import messageReducer from './message';
import orderReducer from './orderReducer';

export default combineReducers({
    productReducer,
    authReducer,
    orderReducer,
    messageReducer
})