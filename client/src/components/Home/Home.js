import React from 'react'
import Navbar from '../Navbar/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from '../Customers/Customers';
import Auth from '../Auth/Auth';
import Products from "../Products/Products";
import Invoice from "../Invoice/Invoice";
import Reports from "../Reports/Reports"; 
import Dashboard from '../Dashboard/Dashboard';

const Home = () => { 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/customers/*' element={<Customers />} />
          <Route path='/products/*' element={<Products />} />
          <Route path='/invoice/*' element={<Invoice />} />
          <Route path='/voucher/*' element={<Reports />} />
          <Route path='/reports/*' element={<Reports />} />
          <Route path='/employees/*' element={<Reports />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Home