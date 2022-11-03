import * as api from "../api";
import { AUTH,CREATE,FETCH_ALL,STOP_LOADING,START_LOADING } from "../constants/actionTypes"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const login = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        console.log("login data" + data);
        if (data.code === 200) {
            dispatch({ type: AUTH, data });
            navigate("/");
        }
        else if (data.message === "Invalid Credentials" && data.code === 500) {
            alert(data.message);
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.log(error);
    }
}

export const addCustomer = (formData,navigate) => async (dispatch) =>{
    try {
        const {data} = await api.addCustomer(formData);
        console.log("dfata",data);
        if(data.code === 200) {
            dispatch({type: CREATE,data});
            toast.success(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
              });
              navigate('/customer/AddCustomer');

        }
        else {
            toast.error(data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
              });

        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllCustomer = () => async (dispatch) =>{
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.getAllCustomer();
        dispatch({type:FETCH_ALL,data: data.result })
        dispatch({ type: STOP_LOADING }); 
     } catch (error) {
        console.log(error);
        
    }
}