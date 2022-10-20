import * as api from "../api";
import { AUTH } from "../constants/actionTypes";
 

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