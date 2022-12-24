import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Add from "./Add/Add";
const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const options = [
    "Dashboard",
    "Add",
    "Manage",
    "Size",
    "Color",
    "Product Group",
  ];
  const icons = {
    "Dashboard": <DashboardIcon />,
    "Add":<AddBoxIcon />,
    "Manage":<InventoryIcon />,
    "Size":<FormatSizeIcon />,
    "Color":<ColorLensIcon />,
    "Product Group":<WorkspacesIcon />,
  };

  return (
    <>
      <Sidebar options={options} icons={icons} mainTab = "products">
        {location.pathname === "/products/Dashboard" ? (
          <Dashboard />
        ) : location.pathname === "/products/Add" ? (
          <Add />
        ) : location.pathname === "/products/Manage" ? (
          <Dashboard />
        ) : location.pathname === "/products/Size" ? (
          <Dashboard />
        ) : location.pathname === "/products/Color" ? (
          <Dashboard />
        ): location.pathname === "/products/ProductGroup" ? (
          <Dashboard />
        ): (
          <Navigate to="/products/Dashboard" />
        )}
      </Sidebar>
    </>
  )
};

export default Products;
