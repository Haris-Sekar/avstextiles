import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://127.0.0.1:5000",
});
baseUrl.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).jwt_token
    }`;
  }
  return req;
});

export const getAllSize = () => baseUrl.get("/product/size");
export const addProduct = (formData) => baseUrl.post("/product/add",formData);
export const getAllProduct = () => baseUrl.get("/product");
export const getAllProductGroup = () => baseUrl.get("/product/productGroup");
export const addProductGroup = (formData) => baseUrl.post("/product/productGroup/add",formData);
export const updateProductGroup = (formData) => baseUrl.put("/product/productGroup/update",formData);
export const deleteProductGroup = (id) => baseUrl.delete("/product/productGroup/delete",id);