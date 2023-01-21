import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InventoryIcon from '@mui/icons-material/Inventory';
const Dashboard = () => {
    const options = [
        "Dashboard",
        "Add",
        "Manage",
    ]
    const icons = {
        "Dashboard": <DashboardIcon />,
        "Add":<AddBoxIcon />,
        "Manage":<InventoryIcon />,
      };
  return (
    <>
    <Sidebar options={options} icons={icons} mainTab = "products">
        <Navbar />
    </Sidebar>
</>

  )
}

export default Dashboard