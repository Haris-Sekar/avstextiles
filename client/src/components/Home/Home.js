import React,{useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from '../Customers/Customers';
import Auth from '../Auth/Auth';
import Products from "../Products/Products";
import Invoice from "../Invoice/Invoice";
import Reports from "../Reports/Reports";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomer } from '../../action/index';

const Home = () => { 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/customers/*' element={<Customers />} />
          <Route path='/products/*' element={<Products />} />
          <Route path='/invoice/*' element={<Invoice />} />
          <Route path='/reports/*' element={<Reports />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Home