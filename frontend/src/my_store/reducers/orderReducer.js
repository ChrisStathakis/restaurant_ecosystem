import {CHOOSE_CREATE_TABLE_ID} from "../actionTypes";


const initialState = {
    createOrderId: null
};


export default function orderReducer(state=initialState, action) {
    switch (action.type){
        case CHOOSE_CREATE_TABLE_ID:
            return {
                ...state,
                createOrderId: action.payload
            };
        default:
            return state
    }
}