import axios from "axios";

const baseUrl = axios.create({
    baseURL:"http://127.0.0.1:5000"
});
baseUrl.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token')).jwt_token}`;
    }
    return req;
  });
  
export const login = (formData) => baseUrl.post("/auth/login",formData);
export const getAllCustomer = () => baseUrl.get('/customer');
export const addCustomer = (formData) => baseUrl.post('/customer/add',formData);
export const updateCustomer = (formData) => baseUrl.put('/customer/update',formData);
export const deleteCustomer = (id) => baseUrl.delete(`/customer/delete?id=${id}`);
export const addMainArea = (formData) => baseUrl.post('/customer/mainArea/add',formData);
export const getAllMainArea = () => baseUrl.get('/customer/mainArea');
export const updateMainArea = (formData) => baseUrl.put('/customer/mainArea/update',formData);
export const deleteMainArea = (id) => baseUrl.delete(`/customer/mainArea/delete?id=${id}`);