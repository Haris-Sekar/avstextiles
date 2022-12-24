export const USERTYPE = {
  0: "ADMIN",
  1: "CUSTOMER",
  2: "EMPLOYEE",
};

export const permissionTypes = {
  0: "VIEW",
  1: "ADD",
  2: "DELETE",
  3: "UPDATE",
};

export const modules = {
  0: "CUSTOMERS",
  1: "PRODUCTS",
  2: "INVOICE",
  3: "REPORTS",
  4: "EMPLOYEES",
};

export const defaultPermissions = {};

for (const key in USERTYPE) {
  defaultPermissions[key] = {};
}

for (const userType in defaultPermissions) {
  for (const permissionType in permissionTypes) {
    if (userType === "0") {
      defaultPermissions[userType][[permissionType]] = Object.keys(modules);
    } else if (userType === "1") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3"];
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = ["0", "1", "2"];
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = ["0", "1", "2"];
    } else if (userType === "2") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3"];
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = [];
    }
  }
}

export const checkRoutPermission = (fromDB, baseURL, route) => {
  console.log(fromDB);
  if (baseURL === "/customer" && fromDB["0"].length > 0) {
    if (
      route.path === "/" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["0"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/add" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["0"].includes("1")
    ) {
      return true;
    } else if (
      route.path === "/update" &&
      route.stack[route.stack.length - 1].method === "put" &&
      fromDB["0"].includes("3")
    ) {
      return true;
    } else if (
      route.path === "/delete" &&
      route.stack[route.stack.length - 1].method === "delete" &&
      fromDB["0"].includes("2")
    ) {
      return true;
    } else if (
      route.path === "/mainArea" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["0"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/addMainArea" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["0"].includes("1")
    ) {
      return true;
    } else {
      return false;
    }
  } else if (baseURL === "/customer" && fromDB["0"].length > 0) {
    if (
      route.path === "/" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["0"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/add" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["0"].includes("1")
    ) {
      return true;
    } else if (
      route.path === "/update" &&
      route.stack[route.stack.length - 1].method === "put" &&
      fromDB["0"].includes("3")
    ) {
      return true;
    } else if (
      route.path === "/delete" &&
      route.stack[route.stack.length - 1].method === "delete" &&
      fromDB["0"].includes("2")
    ) {
      return true;
    } else if (
      route.path === "/mainArea" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["0"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/addMainArea" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["0"].includes("1")
    ) {
      return true;
    } else {
      return false;
    }
  } else if (baseURL === "/product" && fromDB[0].length > 0) {
    if (
      route.path === "/" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["1"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/productGroup" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["1"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/size" &&
      route.stack[route.stack.length - 1].method === "get" &&
      fromDB["1"].includes("0")
    ) {
      return true;
    } else if (
      route.path === "/add" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["1"].includes("1")
    ) {
      return true;
    } else if (
      route.path === "/productGroup/add" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["1"].includes("1")
    ) {
      return true;
    } else if (
      route.path === "/size/add" &&
      route.stack[route.stack.length - 1].method === "post" &&
      fromDB["1"].includes("1")
    ) {
      return true;
    } else if (
      route.path === "/size/delete/:id" &&
      route.stack[route.stack.length - 1].method === "delete" &&
      fromDB["1"].includes("2")
    ) {
      return true;
    } else if (
      route.path === "/productGroup/delete/:id" &&
      route.stack[route.stack.length - 1].method === "delete" &&
      fromDB["1"].includes("2")
    ) {
      return true;
    } else if (
      route.path === "/delete/:id" &&
      route.stack[route.stack.length - 1].method === "delete" &&
      fromDB["1"].includes("2")
    ) {
      return true;
    } else if (
      route.path === "/size/update" &&
      route.stack[route.stack.length - 1].method === "put" &&
      fromDB["1"].includes("3")
    ) {
      return true;
    } else if (
      route.path === "/productGroup/update" &&
      route.stack[route.stack.length - 1].method === "put" &&
      fromDB["1"].includes("3")
    ) {
      return true;
    } else if (
      route.path === "/update" &&
      route.stack[route.stack.length - 1].method === "put" &&
      fromDB["1"].includes("3")
    ) {
      return true;
    }
    else{
      return false;
    }
  }
};
