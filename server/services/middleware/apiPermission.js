import * as API from "../../const/API.js";


export const customer = {
  "/": {
    method: API.GET,
    description: "Get all | id the customer data of the user",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.VIEW,
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
    permissionTypes: API.PERMISSION_TYPE.ADD,
    isParamExceptional: false,
  },
  "/update": {
    method: API.PUT,
    description: "To update the customer data in bulk",
    params: { data: "object" },
    permissionTypes: API.PERMISSION_TYPE.UPDATE,
    isParamExceptional: false,
  },
  "/delete": {
    method: API.DELETE,
    description: "Delete customer data in bulk",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.DELETE,
    isParamExceptional: false,
  },
  "/mainArea": {
    method: API.GET,
    description: "Get all | id main areas",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.VIEW,
    isParamExceptional: true,
  },
  "/mainArea/add": {
    method: API.POST,
    description: "add a new main area",
    params: { name: "string" },
    permissionTypes: API.PERMISSION_TYPE.ADD,
    isParamExceptional: false,
  },

  "/mainArea/update": {
    method: API.PUT,
    description: "Update the main areas in bulk",
    params: { data: "array" },
    permissionTypes: API.PERMISSION_TYPE.UPDATE,
    isParamExceptional: false,
  },
  "/mainArea/delete": {
    method: API.DELETE,
    description: "delete mainArea in bulk",
    params: { data: "array" },
    permissionTypes: API.PERMISSION_TYPE.DELETE,
    isParamExceptional: false,
  },
};

export const product = {
  "/": {
    method: API.GET,
    description: "get all | id products",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.VIEW,
    isParamExceptional: true,
  },
  "/size": {
    method: API.GET,
    description: "get all | id Sizes",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.VIEW,
    isParamExceptional: true,
  },
  "/productGroup": {
    method: API.GET,
    description: "get all | id product group",
    params: { id: "string" },
    permissionTypes: API.PERMISSION_TYPE.VIEW,
    isParamExceptional: true,
  },
  "/productGroup/add":{
    method: API.POST,
    description: "Add a new product group",
    params: {groupName: "string"},
    permissionTypes: API.PERMISSION_TYPE.ADD,
    isParamExceptional: false
  },
  "/productGroup/update":{
    method: API.PUT,
    description: "Update a product group",
    params: {_id: "string",groupName: "string"},
    permissionTypes: API.PERMISSION_TYPE.UPDATE,
    isParamExceptional: false
  },
  "/productGroup/delete" : {
    method: API.DELETE,
    description: "Delete a product group",
    params: {id: "string"},
    permissionTypes: API.PERMISSION_TYPE.DELETE,
    isParamExceptional: false
  },
  "/add":{
    method: API.POST,
    description: "Add a Product",
    params:{
      name: "string",
      pcs: "string",
      price: "object",
      productGroup: "string"
    },
    permissionTypes: API.PERMISSION_TYPE.ADD,
    isParamExceptional: false
  },
  "/size/add":{
    method: API.POST,
    description: "Add a size",
    params:{
      size: "string"
    },
    permissionTypes: API.PERMISSION_TYPE.ADD,
    isParamExceptional: false
  },
  "/size/update":{
    method: API.PUT,
    description: "update a size",
    params:{
      data: "object"
    },
    isParamExceptional: false,
    permissionTypes: 3
  },
  "/size/delete":{
    method: API.DELETE,
    description: "Delete a size",
    params: { id: "string"},
    isParamExceptional: false,
    permissionTypes: 2
  }
};

export const permission = {
  "/modules":{
    method: API.GET,
    description: "Get all moduels",
    permissionTypes: API.PERMISSION_TYPE.VIEW,
    isParamExceptional: true,
  }
}

export const invoice = {
  "/add":{
    method: API.POST,
    description: "Create a new Invoice",
    permissionTypes: API.PERMISSION_TYPE.ADD,
    params: {
      customerId : "string", 
      invoiceRow : "array", 
      invoiceDiscount : "string", 
      invoiceNetRate : "string", 
    },
    isParamExceptional: false
  }
}