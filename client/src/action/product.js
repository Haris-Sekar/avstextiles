import * as api from "../api/product.js";
import {
  FETCH_ALL_PRODUCT_GROUP,
  FETCH_ALL_SIZE,
  START_LOADING,
  STOP_LOADING,
  CREATE_PRODUCT,
  FETCH_ALL_PRODUCT,
  UPDATE_PRODUCT_GROUP,
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
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllProductGroup();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL_PRODUCT_GROUP, data: data.productGroups });
      dispatch({ type: STOP_LOADING });
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

export const addProduct =
  (formData, setPrice, setProduct, initialState, priceInitialState) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.addProduct(formData);
      if (data.code === 201) {
        dispatch({ type: CREATE_PRODUCT, data: data.products });
        dispatch({ type: START_LOADING });
        setProduct(initialState);
        setPrice(priceInitialState);
        Toast("success", data.message);
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllProduct();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL_PRODUCT, data: data.products });
      dispatch({ type: STOP_LOADING });
    }
  } catch (error) {
    Toast("error", error.message);
  }
};

export const addProductGroup = (formData, closeModal) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addProductGroup(formData);
    if (data.code === 201) {
      dispatch({ type: STOP_LOADING });
      closeModal(false);
      Toast("success", data.message);
    }
  } catch (error) {
    Toast("error", error.message);
  }
};

export const updateProductGroup =
  (formData, closeModel) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateProductGroup(formData);
      if (data.code === 200) {
        console.log(data.productGroups);
        dispatch({ type: UPDATE_PRODUCT_GROUP, data: data.productGroups });
        dispatch({ type: STOP_LOADING });
        closeModel(false);
        Toast("success", data.message);

      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

  export const deleteProductGroup = (formData) => async (dispatch) => {
    try{
      const {data} = await api.deleteProductGroup(formData);
      if(data.code === 204) {
        Toast("success",data.message);
      } else {
        Toast("error", data.message);
      }
    } catch(error){
      Toast("error",error.message);
    }
  }