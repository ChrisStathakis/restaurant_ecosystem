import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN} from "../actionTypes";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    'tokens':{
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken')
    },
    isLoggedIn: localStorage.getItem('isLoggedIn')
}

export default function (state=initialState, action){
    const {type, payload} = action;
    switch (type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                tokens: {
                    accessToken: payload.access,
                    refreshToken: payload.refresh
                }

            };
        case REFRESH_TOKEN:
            const tokens = {
                ...state.tokens,
                refreshToken: payload

            };
            return {
                ...state,
                tokens
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        default:
            return state
    }
}