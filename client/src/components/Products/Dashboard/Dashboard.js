import React from "react";
import { CircularProgress } from '@mui/material';
import logo from "../../../assets/images/logo.png";
function Dashboard() {

  return (
    <div>
      <img src={logo} alt="logo"/>
      <CircularProgress />
    </div>
  );
}

export default Dashboard;
