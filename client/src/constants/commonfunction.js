import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { PERMISSION } from "./consts";

export function formatMoney(input) {
  input = input.toString();
  input = input.replace(/\D/g, "");
  return input.split(".")[0].length > 3
    ? input
        .toString()
        .substring(0, input.toString().split(".")[0].length - 3)
        .replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        "," +
        input.toString().substring(input.toString().split(".")[0].length - 3)
    : input.toString();
}



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

export const getNavbarItems = () => {
  try{
     const permission = jwt_decode(localStorage.getItem('token')).permission;
     const module = [];
     permission[0].forEach( e => {
        module.push(modules[e]);
     });
     return module;
  } catch(error){
    console.log(error);
  }
}


export const checkRoute = (location,navigate) => {
  try{
    location = location.split('/')[1];
    let hasPermission = checkPermission(location,PERMISSION.VIEW);
    if(!hasPermission) {
      localStorage.clear();
      navigate('/auth');
    }
  } catch(error) {
    console.log(error);
  }
  
}

export const checkPermission = (moduelName,permissionType) => {
  const permission = jwt_decode(localStorage.getItem('token')).permission;
  let locationModule;
  let moduleIndex; 
  let moduleArray = Object.values(modules);
  for(let i=0;i<moduleArray.length;i++){
    locationModule = moduelName.includes(moduleArray[i].toLowerCase());
    moduleIndex = i;
    if(locationModule) break;
  }
  return permission[moduleIndex].includes(permissionType.toString());
}

export const sortSize = (size) => {
  let numericSize = [];
  let alphaSize = [];
  size.forEach((size) => {
    if(isNaN(size.size)){
      alphaSize.push(size);
    } else {
      numericSize.push(size);
    }
  });
  return [...sortNumericSize(numericSize),...alphaSize];
}

export const sortNumericSize = (numericSize) => {
  let result = [];
  result = numericSize.sort((a,b)=> a.size - b.size);
  return result;
}


export const generateRandomId = (length = 8) =>  {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

export const Toast = (type,message) => {

  toast[type](message,{
    duration: 4000,
    position:"top-right",
    style:{
      minWidth: '200px',
      minHeight: '50px',
      padding: '15px 20px',
      margin: '2%',
      fontWeight: 900,
      fontSize: '17px',
      borderRadis: '10px'
    }
  })
}
