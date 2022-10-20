import React from 'react'
import Navbar from '../Navbar/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from '../Customers/Customers';
import Auth from '../Auth/Auth';
import Products from "../Products/Products";
import Invoice from "../Invoice/Invoice";
import Reports from "../Reports/Reports"
const Home = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/customers/*' element={<Customers />} />
          <Route path='/products/*' element={<Products />} />
          <Route path='/Invoice' element={<Invoice />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Home