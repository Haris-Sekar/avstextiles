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
import Navbar from "../Navbar/Navbar";
import AddContainer from "../Customers/Add/AddContainer";
const Customers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = ["Dashboard", "Add Customer", "Customers", "Main Area"];
  const icons = {
    Dashboard: <DashboardIcon />,
    "Add Customer": <PersonAddAltIcon />,
    "Customers": <GroupIcon />,
    "Main Area" : <DomainIcon />
  }

  return (
    <>
      <Sidebar options={options} icons={icons} mainTab = "customers">
      <Navbar />

        {location.pathname === "/customers/dashboard" ? (
          <Dashboard />
        ) : location.pathname === "/customers/addcustomer" ? (
          <AddContainer />
        ) : location.pathname === "/customers/customers" ? (
          <Manage />
        ) : location.pathname === "/customers/mainarea" ? (
          <MainArea />
        ) : (
          <Navigate to="/customers/dashboard" />
        )}
      </Sidebar>
    </>
  );
};

export default Customers;
