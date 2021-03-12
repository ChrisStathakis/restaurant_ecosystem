import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN} from "../actionTypes";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    'tokens': {
        accessToken: AsyncStorage.getItem('accessToken'),
        refreshToken: AsyncStorage.getItem('refreshToken')
    },
    isLoggedIn: AsyncStorage.getItem('IsLoggedIn')
}

export default function(state=initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                tokens: {
                    accessToken: action.payload.access,
                    refreshToken: action.payload.refresh
                }
            }
        
        case REFRESH_TOKEN:
            const tokens = {
                ...state.tokens,
                refreshToken: payload
            }
            return {
                ...state,
                tokens
            }
        
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state

    }
}