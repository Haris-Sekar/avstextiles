import {combineReducers} from "redux";
import authReducer from "./auth"
import customerReducer from "./customer";

export default combineReducers({
    authReducer,customerReducer
})
