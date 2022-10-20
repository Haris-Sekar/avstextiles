import axios from "axios";

const baseUrl = axios.create({
    baseURL:"http://127.0.0.1:5000"
});
baseUrl.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).token}`;
    }
    return req;
  });


export const fetch = () => baseUrl.get("/testget");
export const postMethod = () => baseUrl.post("/test");

export const login = (formData) => baseUrl.post("/auth/login",formData);