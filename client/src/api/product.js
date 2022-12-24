import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://127.0.0.1:5000",
});
baseUrl.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token"));
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token")).jwt_token
    }`;
  }
  return req;
});

export const getAllProductGroup = () => baseUrl.get("/product/productGroup");
export const getAllSize = () => baseUrl.get("/product/size");