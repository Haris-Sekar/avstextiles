import * as apis from "../services/middleware/apiPermission.js";
import * as API from "./API.js";
export const USERTYPE = {
  0: "ADMIN",
  1: "EMPLOYEE",
  2: "CUSTOMER",
};

export const permissionTypes = {
  0: "VIEW",
  1: "ADD",
  2: "DELETE",
  3: "UPDATE",
};

export const modules = {
  0: "CUSTOMER",
  1: "PRODUCT",
  2: "INVOICE",
  3: "REPORT",
  4: "EMPLOYEE",
  5: "VOUCHER",
};

export const defaultPermissions = {};

for (const key in USERTYPE) {
  defaultPermissions[key] = {};
}

for (const userType in defaultPermissions) {
  for (const permissionType in permissionTypes) {
    if (userType === "0") {
      defaultPermissions[userType][[permissionType]] = Object.keys(modules); // admin with all permission
    } else if (userType === "1") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3", "5"]; // Employee view permission
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = ["0", "1", "2", "5"]; // Employee Edit permission
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = []; //Employee Delete permission
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = ["0", "1", "2", "5"]; //Employee Update Permission
    } else if (userType === "2") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3","5"]; // Customer view permission
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = []; // Customer Edit permission
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = []; // Customer Delete permission
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = []; // Customer Update permission
    }
  }
}

export const checkRoutPermission = (fromDB, baseURL, route, req) => {
  let response = {
    code: 401,
    message: "Unauthorized access",
  }
  const request = apis[baseURL.split("/")[1]][route.path];
  if(!request){
    return {type: false,response}
  }
  const requestModule = Object.keys(modules).find(
    (key) => modules[key].toLowerCase() === baseURL.split("/")[1]
  );
  if (
    request.method === route.stack[route.stack.length - 1].method &&
    fromDB[requestModule].includes(request.permissionTypes.toString())
  ) {
    const requestParam = getParams(req);
    const apiParams = Object.keys(request.params);
    let flag = true;
    if(!request.isParamExceptional){
      apiParams.forEach((param) => {
        if (!Object.keys(requestParam).includes(param)) {
          response = {
            code: 400,
            message: "Parameter mismatch",
          }
          flag =  false;
        } else if (request.params[param] != typeof requestParam[param]){
          response = {
            code: 422,
            message: "Parameter datatype mismatch",
          } 
          flag =  false;
        }
      });
    }
    return {type: flag,response};
  } else {
    return {type: flag,response}
  }
};

function getParams(request) {
  switch (request.route.stack[request.route.stack.length - 1].method) {
    case API.GET:
      return request.query;
    case API.POST:
      return request.body;
    case API.DELETE:
      return request.query;
    case API.PUT:
      return request.body;
    case API.PATCH:
      return request.body;
    default:
      break;
  }
}
