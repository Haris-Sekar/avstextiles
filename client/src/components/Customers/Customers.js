import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Manage from "./Manage/Manage";
import Add from "./Add/Add";
import MainArea from "./MainArea/MainArea";
import { useNavigate, Navigate } from "react-router-dom";
const Customers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Dashboard", "Add Customer", "Manage Customers", "Main Area"];

  return (
    <>
      <Sidebar options={options}>
        {location.pathname === "/customers/Dashboard" ? (
          <Dashboard />
        ) : location.pathname === "/customers/AddCustomer" ? (
          <Add />
        ) : location.pathname === "/customers/ManageCustomers" ? (
          <Manage />
        ) : location.pathname === "/customers/MainArea" ? (
          <MainArea />
        ) : (
          <Navigate to="/customers/Dashboard" />
        )}
      </Sidebar>
    </>
  );
};

export default Customers;
