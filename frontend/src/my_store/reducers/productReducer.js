import {GET_CATEGORIES, GET_PRODUCT_CLASS, GET_PRODUCTS} from "../actionTypes";


const initialState = {
    products: [],
    categories: [],
    productClass: []
};


export default function productReducer(state=initialState, action) {

    switch (action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCT_CLASS:
            return {
                ...state,
                productClass: action.payload
            }
        default:
            return state
    }
}