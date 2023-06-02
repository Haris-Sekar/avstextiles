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
  BTN_LOADING_START,
  BTN_LOADING_END,
  DELETE_BTN_LOAD_START,
  DELETE_BTN_LOAD_END,
  DELETE_CUSTOMER,
} from "../constants/actionTypes";
import { Toast } from "../constants/commonfunction";


export const addCustomer = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({type: BTN_LOADING_START});
    const { data } = await api.addCustomer(formData);
    if (data.code === 200) {
      dispatch({ type: CREATE, data });
      dispatch({type: BTN_LOADING_END});
      navigate("/customers/customers",{"toast":data.message,"type":"success"});
      Toast("success", data.message);
    } else {
      Toast("error", data.message);
      dispatch({type: BTN_LOADING_END});
    }
  } catch (error) {
    Toast("error", error);
    dispatch({type: BTN_LOADING_END});
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
      dispatch({ type: BTN_LOADING_START });
      const { data } = await api.updateCustomer(formData);
      if (data.code === 200) {
        dispatch({ type: UPDATE, data: data.result });
        dispatch({ type: BTN_LOADING_END });
        closeModal();
      } else {
        dispatch({ type: BTN_LOADING_END });
        Toast("error", data.message);
      }
    } catch (error) {
      dispatch({ type: BTN_LOADING_END });
      Toast("error", error);
    }
  };

export const deleteCustomer = (id, closeModal) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BTN_LOAD_START});

    const { data } = await api.deleteCustomer(id);
    const { allCustomer } = await api.getAllCustomer();
    if (data.code === 200) {
      dispatch({type: DELETE_CUSTOMER})
      dispatch({ type: DELETE_BTN_LOAD_END});
      Toast("success", data.message);
      closeModal();
    } else {
      Toast("success", data.message);
      dispatch({ type: DELETE_BTN_LOAD_END});
    }
  } catch (error) {
    Toast("error", error);
    dispatch({ type: DELETE_BTN_LOAD_END});
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
