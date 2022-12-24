import * as api from "../api/product.js";
import {
  FETCH_ALL_PRODUCT_GROUP,
  FETCH_ALL_SIZE,
  START_LOADING,
  STOP_LOADING,
} from "../constants/actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = (type, message) =>
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

export const getAllProductGroup = () => async (dispatch) => {
  try {
    const { data } = await api.getAllProductGroup();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL_PRODUCT_GROUP, data: data.productGroups });
    }
  } catch (error) {
    Toast("error", error.message);
  }
};

export const getAllSize = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllSize();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL_SIZE, data: data.sizes });
      dispatch({ type: STOP_LOADING });
    }
  } catch (error) {
    Toast("error", error.message);
  }
};
