import * as API from "../../const/API.js";

export const customer = {
  "/": {
    method: API.GET,
    description: "Get all | id the customer data of the user",
    params: { id: "string" },
    permissionTypes: 0,
    isParamExceptional: true,
  },
  "/add": {
    method: API.POST,
    description: "Add a new customer",
    params: {
      companyName: "string",
      name: "string",
      email: "string",
      phone: "string",
      address1: "string",
      address2: "string",
      city: "string",
      state: "string",
      pincode: "string",
      gstNumber: "string",
      mainArea: "string",
      balance: "string",
    },
    permissionTypes: 1,
    isParamExceptional: false,
  },
  "/update": {
    method: API.PUT,
    description: "To update the customer data in bulk",
    params: { data: "array" },
    permissionTypes: 3,
    isParamExceptional: false,
  },
  "/delete": {
    method: API.DELETE,
    description: "Delete customer data in bulk",
    params: { data: "array" },
    permissionTypes: 2,
    isParamExceptional: false,
  },
  "/mainArea": {
    method: API.GET,
    description: "Get all | id main areas",
    params: { id: "string" },
    permissionTypes: 0,
    isParamExceptional: true,
  },
  "/mainArea/add": {
    method: API.POST,
    description: "add a new main area",
    params: { name: "string" },
    permissionTypes: 1,
    isParamExceptional: false,
  },

  "/mainArea/update": {
    method: API.PUT,
    description: "Update the main areas in bulk",
    params: { data: "array" },
    permissionTypes: 3,
    isParamExceptional: false,
  },
  "/mainArea/delete": {
    method: API.DELETE,
    description: "delete mainArea in bulk",
    params: { data: "array" },
    permissionTypes: 2,
    isParamExceptional: false,
  },
};

export const product = {
  "/": {
    method: API.GET,
    description: "get all | id products",
    params: { id: "string" },
    permissionTypes: 0,
    isParamExceptional: true,
  },
  "/size": {
    method: API.GET,
    description: "get all | id Sizes",
    params: { id: "string" },
    permissionTypes: 0,
    isParamExceptional: true,
  },
  "/productGroup": {
    method: API.GET,
    description: "get all | id product group",
    params: { id: "string" },
    permissionTypes: 0,
    isParamExceptional: true,
  },
  "/productGroup/add":{
    method: API.POST,
    description: "Add a new product group",
    params: {groupName: "string"},
    permissionTypes: 1,
    isParamExceptional: false
  },
  "/productGroup/update":{
    method: API.PUT,
    description: "Update a product group",
    params: {_id: "string",groupName: "string"},
    permissionTypes: 3,
    isParamExceptional: false
  },
  "/productGroup/delete" : {
    method: API.DELETE,
    description: "Delete a product group",
    params: {id: "string"},
    permissionTypes: 2,
    isParamExceptional: false
  }
};
