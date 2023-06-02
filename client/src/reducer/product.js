import * as actionType from "../constants/actionTypes";

const productReducer = (
  state = { product: [], productGroup: [], sizes: [], isLoading: true, btnLoad: false },
  action
) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.STOP_LOADING:
      return { ...state, isLoading: false };
    case actionType.BTN_LOADING_START:
      return { ...state, btnLoad: true };
    case actionType.BTN_LOADING_END:
      return { ...state, btnLoad: false };
    case actionType.FETCH_ALL_PRODUCT_GROUP:
      return { ...state, productGroup: action.data };
    case actionType.FETCH_ALL_SIZE:
      return { ...state, sizes: action.data };
    case actionType.FETCH_ALL_PRODUCT:
      return { ...state, product: action.data };
    case actionType.CREATE_PRODUCT:
      return { ...state, product: action.data };
    case actionType.CREATE_PRODUCT_GROUP:
      return { ...state, productGroup: [...state.productGroup,action.data] };
    case actionType.CREATE_SIZE:
      return { ...state, sizes: [...state.sizes, action.data] };
    case actionType.DELETE_SIZE:
      let sizes = state.sizes;
      sizes.forEach((size, index, object) => {
        if (size._id === action.data) {
          object.splice(index, 1);
        }
      });
      return { ...state, sizes: sizes };
    default:
      return state;
  }
};

export default productReducer;
