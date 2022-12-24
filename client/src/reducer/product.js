import * as actionType from '../constants/actionTypes';

const productReducer = (state = {productGroup: [],sizes: []},action) =>{
    switch (action.type) {
        case actionType.FETCH_ALL_PRODUCT_GROUP:
            return {...state,productGroup: action.data}
        case actionType.FETCH_ALL_SIZE:
            return {...state,sizes: action.data}
        default:
            return state;
    }
}

export default productReducer;