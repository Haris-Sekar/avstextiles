import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { useLocation } from 'react-router-dom';
import Dashboard from "./Dashboard/Dashboard";
import Manage from "./Manage/Manage";
import Add from "./Add/Add";
const Customers = () => {
  const location = useLocation();
  return (
    <>
      <Sidebar options={['Dashboard', 'Add Customer', 'Manage Customers']}>{location.pathname === '/customers/Dashboard' ? (<Dashboard />) : (location.pathname==='/customers/Add Customer') ? (<Add />) : (location.pathname === '/customers/Manage Customers') ? (<Manage />) : (<Dashboard />)}</Sidebar>

    </>
  )
}

export default Customers