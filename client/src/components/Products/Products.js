import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AppsIcon from '@mui/icons-material/Apps';
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import AddContainer from "./Add/AddContainer";
import Manage from "./Manage/Manage";
import ProductGroup from "./ProductGroup/ProductGroup";
import Navbar from "../Navbar/Navbar";
const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = [
    "Dashboard",
    "Add",
    "Products",
    "Size",
    "Color",
    "Product Group",
  ];
  const icons = {
    "Dashboard": <DashboardIcon />,
    "Add":<AddBoxIcon />,
    "Products":<InventoryIcon />,
    "Size":<FormatSizeIcon />,
    "Color":<ColorLensIcon />,
    "Product Group":<AppsIcon />,
  };

  return (
    <>
      <Sidebar options={options} icons={icons} mainTab = "products">
      <Navbar />

        {location.pathname === "/products/dashboard" ? (
          <Dashboard />
        ) : location.pathname === "/products/add" ? (
          <AddContainer />
        ) : location.pathname === "/products/products" ? (
          <Manage />
        ) : location.pathname === "/products/size" ? (
          <Dashboard />
        ) : location.pathname === "/products/color" ? (
          <Dashboard />
        ): location.pathname === "/products/productgroup" ? (
          <ProductGroup />
        ): (
          <Navigate to="/products/dashboard" />
        )}
      </Sidebar>
    </>
  )
};

export default Products;
