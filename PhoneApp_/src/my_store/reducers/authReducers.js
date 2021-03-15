import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN} from "../actionTypes";


async function initialState () {
    return{
        tokens: {
        accessToken:  ''  ,
        refreshToken: ''
    },
    isLoggedIn: ''
    }
}


export default function(state=initialState(), action){

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