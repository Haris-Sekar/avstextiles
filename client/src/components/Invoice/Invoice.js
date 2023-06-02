import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import Add from './Add/Add';
import Manage from './Manage/Manage';
const Invoice = () => {

  const location = useLocation();
  const options = [
    "Dashboard",
    "New Invoice",
    "Invoices"
  ];
  const icons = {
    "Dashboard": <DashboardIcon />,
    "New Invoice": "",
    "Invoices": "",
  }
  return (
    <Sidebar options={options} icons={icons} mainTab="invoice">
      <Navbar />
      { location.pathname === "/invoice/dashboard" ? (
          <Dashboard />
        ) : location.pathname === "/invoice/newinvoice" ? (
          <Add />
        ) : location.pathname === "/invoice/invoices" ? (
          <Manage />
        ) : (
          <Navigate to="/invoice/dashboard" />
        )}
    </Sidebar>
  )
}

export default Invoice