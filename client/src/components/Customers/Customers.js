import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useLocation } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import Manage from "./Manage/Manage";
import Add from "./Add/Add";
import { useNavigate } from 'react-router-dom';
const Customers = () => {
  const navigate = useNavigate();
  const location = useLocation();
const options = ['Dashboard', 'Add Customer', 'Manage Customers']
  function renderComponent(){
    if(location.pathname === '/customers/Dashboard') return (<Dashboard />)
    else if (location.pathname === '/customers/AddCustomer') return (<Add />)
    else if (location.pathname === '/customer/ManageCustomers') return (<Manage />)
    else{
      navigate('/customers/Dashboard');
      return "";
    }
  } 
  console.log(location.pathname);
  return (
    <>
      <Sidebar options={options}>{location.pathname === '/customers/Dashboard' ? (<Dashboard />) : (location.pathname === '/customers/AddCustomer') ? (<Add />) : (location.pathname === '/customers/ManageCustomers') ? (<Manage />) : (<Dashboard />)}</Sidebar>

    </>
  )
}

export default Customers