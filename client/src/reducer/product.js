import * as actionType from "../constants/actionTypes";

const productReducer = (
  state = { product: [], productGroup: [], sizes: [], isLoading: true },
  action
) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.STOP_LOADING:
      return { ...state, isLoading: false };
    case actionType.FETCH_ALL_PRODUCT_GROUP:
      return { ...state, productGroup: action.data };
    case actionType.FETCH_ALL_SIZE:
      return { ...state, sizes: action.data };
    case actionType.FETCH_ALL_PRODUCT:
      return { ...state, product: action.data };
    case actionType.CREATE_PRODUCT:
      return { ...state, product: action.data };
    default:
      return state;
  }
};

export default productReducer;
