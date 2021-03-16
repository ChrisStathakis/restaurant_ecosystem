import {INITIAL_DATA, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN} from "../actionTypes";


async function initialState () {
    return{
        tokens: {
        accessToken:  ''  ,
        refreshToken: ''
    },
    isLoggedIn: '',
        doneAppLoading: false
    }
}


export default function(state=initialState(), action){

    switch(action.type){
        case INITIAL_DATA:
            const payload = action.payload;
            return {
                isLoggedIn: payload.isLoggedIn,
                tokens: {
                    accessToken: payload.accessToken,
                    refreshToken: payload.refreshToken
                },
                doneAppLoading: true
            }
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