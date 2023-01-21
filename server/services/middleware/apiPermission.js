import * as API from "../../const/API.js";

export const customer = {
  "/": {
    method: API.GET,
    description: "Get all | id the customer data of the user",
    params: { id: "string" },
    permissionTypes: 0,
  },
  "/add": {
    method: API.POST,
    description: "Add a new customer",
    params: {
      companyName: "string",
      name: "string",
      email: "string",
      phone: "number",
      address1: "string",
      address2: "string",
      city: "string",
      state: "string",
      pincode: "number",
      gstNum: "string",
      mainArea: "string",
      balance: "number",
    },
    permissionTypes: 1,
  },
  "/update": {
    method: API.PUT,
    description: "To update the customer data in bulk",
    params: { data: "array" },
    permissionTypes: 3,
  },
  "/delete": {
    method: API.DELETE,
    description: "Delete customer data in bulk",
    params: { data: "array" },
    permissionTypes: 2,
  },
  "/mainArea": {
    method: API.GET,
    description: "Get all | id main areas",
    params: { id: "string" },
    permissionTypes: 0,
  },
  "/mainArea/add": {
    method: API.POST,
    description: "add a new main area",
    params: { name: "string" },
    permissionTypes: 1,
  },

  "/mainArea/update": {
    method: API.PUT,
    description: "Update the main areas in bulk",
    params: { data: "array" },
    permissionTypes: 3,
  },
  "/mainArea/delete": {
    method: API.DELETE,
    description: "delete mainArea in bulk",
    params: { data: "array" },
    permissionTypes: 2,
  },
};

export const product = {
  "/":{
    method: API.GET,
    description: "get all | id products",
    params: { id: "string"},
    permissionTypes: 0,
  },
  "/size":{
    method: API.GET,
    description: "get all | id Sizes",
    params: { id: "string"},
    permissionTypes: 0,
  },
  "/productGroup":{
    method: API.GET,
    description: "get all | id product group",
    params: { id: "string"},
    permissionTypes: 0,
  }
}
