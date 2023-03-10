import * as api from "../api";
import {
  CREATE,
  FETCH_ALL,
  STOP_LOADING,
  START_LOADING,
  UPDATE,
  CREATE_MAIN_AREA,
  FETCH_ALL_MAIN_AREA,
  UPDATE_MAIN_AREA,
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

export const addCustomer = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.addCustomer(formData);
    if (data.code === 200) {
      dispatch({ type: CREATE, data });
      navigate("/customers/customers",{"toast":data.message,"type":"success"});
      Toast("success", data.message);
    } else {
      Toast("error", data.message);
    }
  } catch (error) {
    Toast("error", error);
  }
};

export const addMainArea = (formData, closeModel) => async (dispatch) => {
  try {
    const { data } = await api.addMainArea(formData);
    if (data.code === 200) {
      dispatch({ type: CREATE_MAIN_AREA, data: data.result });
      Toast("success", data.message);
      closeModel(false);
    } else {
      Toast("error", data.message);
    }
  } catch (error) {
    Toast("error", error);
  }
};

export const getAllCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllCustomer();
    dispatch({ type: FETCH_ALL, data: data.result });
    dispatch({ type: STOP_LOADING });
  } catch (error) {
    Toast("error", error);
  }
};

export const getAllMainArea = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.getAllMainArea();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL_MAIN_AREA, data: data.result });
      dispatch({ type: STOP_LOADING });
    } else {
      dispatch({ type: STOP_LOADING });
      localStorage.clear();
      Toast("Login error", data.message);
    }
  } catch (error) {
    Toast("error", error);
  }
};
export const updateCustomer =
  (formData, navigate, closeModal) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.updateCustomer(formData);
      if (data.code === 200) {
        dispatch({ type: UPDATE, data: data.result });

        dispatch({ type: STOP_LOADING });
        closeModal();
      } else {
        Toast("error", data.message);
      }
    } catch (error) {
      Toast("error", error);
    }
  };

export const deleteCustomer = (id, closeModal) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.deleteCustomer(id);
    const { allCustomer } = await api.getAllCustomer();
    if (data.code === 200) {
      dispatch({ type: FETCH_ALL, data: allCustomer });

      dispatch({ type: STOP_LOADING });
      Toast("success", data.message);
      closeModal();
    }
  } catch (error) {
    Toast("error", error);
  }
};

export const updateMainArea = (formData, closeModal) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateMainArea(formData);
    if (data.code === 200) {
      dispatch({ type: UPDATE_MAIN_AREA, data: data.result });
      dispatch({ type: STOP_LOADING });
      Toast("success", data.message);
      closeModal(false);
    }
  } catch (error) {
    Toast("error", error);
  }
};

export const deleteMainArea = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.deleteMainArea(id);

    if (data.code === 200) {
      dispatch({ type: STOP_LOADING });
      Toast("success", data.message);
    } else {
      Toast("warning",data.message);
    }
  } catch (error) {
    Toast("error", error.message);
  }
};
