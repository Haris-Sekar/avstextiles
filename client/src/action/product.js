import * as api from "../api/product.js";
import {
  FETCH_ALL_PRODUCT_GROUP,
  FETCH_ALL_SIZE,
  START_LOADING,
  STOP_LOADING,
  CREATE_PRODUCT,
  FETCH_ALL_PRODUCT,
  UPDATE_PRODUCT_GROUP,
  UPDATE_SIZE,
  CREATE_SIZE,
  DELETE_SIZE,
  BTN_LOADING_START,
  BTN_LOADING_END,
  CREATE_PRODUCT_GROUP,
} from "../constants/actionTypes";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../constants/consts.js";
import {Toast} from "../constants/commonfunction"


// const Toast = (type, message) =>
//   toast[type](message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "colored",
//   });



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
    dispatch({ type: BTN_LOADING_START });
    const { data } = await api.addProductGroup(formData);
    if (data.code === 201) {
      dispatch({ type: BTN_LOADING_END });
      dispatch({type: CREATE_PRODUCT_GROUP,data: data.result})
      closeModal(false);
      Toast("success", data.message);
    }
  } catch (error) {
    Toast("error", error.message);
  }
};

export const addSize = (formData,closeModal) => async (dispatch) => {
  try{
    dispatch({type: BTN_LOADING_START});
    const {data} = await api.addSize(formData);
    if(data.code === 201) {
      dispatch({type: BTN_LOADING_END});
      closeModal(false);
      Toast("success",data.message);
      dispatch({type: CREATE_SIZE,data: data.result});
    } else {
      dispatch({type: BTN_LOADING_END});
      Toast("error",API.generalError)
    }
  } catch( error ){
    Toast("error",error.message);
  }
}

export const updateProductGroup =
  (formData, closeModel) => async (dispatch) => {
    try {
      dispatch({ type: BTN_LOADING_START });
      const { data } = await api.updateProductGroup(formData);
      if (data.code === 200) {
        console.log(data.productGroups);
        dispatch({ type: UPDATE_PRODUCT_GROUP, data: data.productGroups });
        dispatch({ type: BTN_LOADING_END });
        closeModel(false);
        Toast("success", data.message);
      }
    } catch (error) {
      Toast("error", error.message);
    }
  };

export const updateSize = (formData,closeModal) => async (dispatch) =>{
  try{
    dispatch({type:BTN_LOADING_START});
    const {data} = await api.updateSize(formData);
    if(data.code === 200) {
      dispatch({type: UPDATE_SIZE});
      dispatch({type: BTN_LOADING_END});
      closeModal(false);
      Toast("success",data.message);
    }else {
      dispatch({type: BTN_LOADING_END});
      Toast("error",API.generalError)
    }
  } catch (error) {
    Toast("error", error.message);
  }
}


  export const deleteProductGroup = (formData) => async (dispatch) => {
    try{
      dispatch({type: BTN_LOADING_START})
      const {data} = await api.deleteProductGroup(formData);
      if(data.code === 202) {
        dispatch({type: BTN_LOADING_END})
        Toast("success",data.message);
      } else {
        dispatch({type: BTN_LOADING_END})
        Toast("error", data.message);
      }
    } catch(error){
      dispatch({type: BTN_LOADING_END})
      Toast("error",error.message);
    }
  }

  export const deleteSize = (id) => async(dispatch) => {
    try {
      dispatch({type: BTN_LOADING_START});
      const {data} = await api.deleteSize(id);
      if(data.code === 202) {
        dispatch({type: DELETE_SIZE,data: data.deletedId});
        dispatch({type: BTN_LOADING_END});
        Toast("success",data.message);
      } else {
        Toast("error",API.generalError);
      }
    } catch (error) {
      Toast("error",error.message);
    }
  }