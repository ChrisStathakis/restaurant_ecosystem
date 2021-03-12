import {CHOOSE_CREATE_TABLE_ID} from "../actionTypes";


export function selectCreateTable(id){
    return function (dispatch) {
        dispatch({
            type:CHOOSE_CREATE_TABLE_ID,
            payload: id
        })
    }
}

