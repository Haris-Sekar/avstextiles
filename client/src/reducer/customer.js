import * as actionType from '../constants/actionTypes';

const customerReducer = (state = {customerData : null,customers : [],isLoading: true},action) =>{
    switch (action.type) {
        case actionType.START_LOADING: 
            return {...state,isLoading: true};
        case actionType.STOP_LOADING:
            return {...state,isLoading: false};
        case actionType.CREATE:
            return {...state,customerData : action.data}
        case actionType.FETCH_ALL:
             return{...state,customers : action.data}
        default:
            return state;
    }
}

export default customerReducer;