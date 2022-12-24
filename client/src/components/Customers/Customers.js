import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Manage from "./Manage/Manage";
import Add from "./Add/Add";
import MainArea from "./MainArea/MainArea";
import { useNavigate, Navigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupIcon from '@mui/icons-material/Group';
import DomainIcon from '@mui/icons-material/Domain';
const Customers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Dashboard", "Add Customer", "Manage Customers", "Main Area"];
  const icons = {
    Dashboard: <DashboardIcon />,
    "Add Customer": <PersonAddAltIcon />,
    "Manage Customers": <GroupIcon />,
    "Main Area" : <DomainIcon />
  }

  return (
    <>
      <Sidebar options={options} icons={icons} mainTab = "customers">
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
