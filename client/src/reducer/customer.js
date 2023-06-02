import * as actionType from "../constants/actionTypes";

const customerReducer = (
  state = { customerData: null, customers: [], isLoading: true, mainAreas: [],btnLoad:false,deleteBtnLoad: false},
  action
) => {
  switch (action.type) {
    case actionType.START_LOADING:
      return { ...state, isLoading: true };
    case actionType.STOP_LOADING:
      return { ...state, isLoading: false };
    case actionType.CREATE:
      return { ...state, customerData: action.data };
    case actionType.FETCH_ALL:
      return { ...state, customers: action.data };
    case actionType.UPDATE:
      return { ...state, customers: action.data };
    case actionType.CREATE_MAIN_AREA:
      return { ...state, mainAreas: action.data };
    case actionType.FETCH_ALL_MAIN_AREA:
      return { ...state, mainAreas: action.data };
    case actionType.UPDATE_MAIN_AREA:
      return { ...state, mainAreas: action.data };
    case actionType.BTN_LOADING_START:
      return {...state, btnLoad: true}
    case actionType.BTN_LOADING_END:
      return {...state, btnLoad: false}
    case actionType.DELETE_BTN_LOAD_START: 
      return {...state, deleteBtnLoad: true};
    case actionType.DELETE_BTN_LOAD_END:
      return {...state, deleteBtnLoad: false};
    case actionType.DELETE_CUSTOMER:
      const customers = state.customers;
      customers.forEach((cusotmer, index, object) => {
        if (cusotmer._id === action.data) {
          object.splice(index, 1);
        }
      })
      return {...state,customers: customers};
    default:
      return state;
  }
};

export default customerReducer;
