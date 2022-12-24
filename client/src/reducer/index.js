import { combineReducers } from "redux";
import authReducer from "./auth";
import customerReducer from "./customer";
import productReducer from "./product";

export default combineReducers({
  authReducer,
  customerReducer,
  productReducer,
});
