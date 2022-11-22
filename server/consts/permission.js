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
  0: "DASHBOARD",
  1: "CUSTOMERS",
  2: "PRODUCTS",
  3: "INVOICE",
  4: "REPORTS",
  5: "EMPLOYEES",
};
 

export const defaultPermissions = {};

for (const key in USERTYPE) {
  defaultPermissions[key] = {};
}

for (const userType in defaultPermissions) {
  for (const permissionType in permissionTypes) {
    if (userType === "0") {
      permissionType === "0"
        ? (defaultPermissions[userType][[permissionType]] =
            Object.keys(modules))
        : (defaultPermissions[userType][[permissionType]] =
            Object.keys(modules).slice(1));
    } else if (userType === "1") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["0", "1", "2", "3"];
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3"];
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = ["1", "2", "3"];
     } else if (userType === "2") {
      if (permissionType === "0")
        defaultPermissions[userType][[permissionType]] = ["0", "2", "3", "4"];
      else if (permissionType === "1")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "2")
        defaultPermissions[userType][[permissionType]] = [];
      else if (permissionType === "3")
        defaultPermissions[userType][[permissionType]] = [];
    }
  }
}

 