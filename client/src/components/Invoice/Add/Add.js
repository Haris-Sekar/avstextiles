import { Autocomplete, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from "../../../action/customer";
import "./Add.css";


const Add = () => {
  const [customer, setCustomer] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  const { customers } = useSelector((state) => state.customerReducer);


  const collectCustomerDataForBilling = (customerObject) => {
    let result = [];

    customerObject.forEach((customer) => {
      result.push(customer.cusId + "-" + customer.companyName);
    });
    return result;
  };

  const handleOnSelect = (e) => {
    const tempCustomer = customers.filter(
      (ele) => ele.cusId === e.target.value.split("-")[0]
    );
    console.log(tempCustomer);
    setCustomer(tempCustomer);
  };


  return (
    <>
      <Paper elevation={5} sx={{ margin: "1% 2%", borderRadius: 3 }}>
        <div className="companyDetailContainer">
          <div className="labelContainer">
            <span id="label">Select Customer</span>
            <Autocomplete
              disablePortal
              className="textBox"
              autoHighlight
              id="auto-highlight"
              options={collectCustomerDataForBilling(customers)}
              sx={{ width: "75%" }}
              onSelect={handleOnSelect}
              renderInput={(params) => (
                <TextField autoFocus {...params} label="Company Name" />
              )}
            />
          </div>
          <div className="labelContainer">
            <span id="label">Company Name</span>
            <TextField
              disabled
              className="textBox"
              id="outlined-basic"
              sx={{ width: "75%" }}
              name="asdf"
              variant="outlined"
              value={customer[0]?.companyName}
            />
          </div>
          <div className="labelContainer">
            <span id="label">Main Area</span>
            <TextField
              disabled
              className="textBox"
              id="outlined-basic"
              sx={{ width: "75%" }}
              name="asdf"
              variant="outlined"
              value={customer[0]?.mainArea}
            />
          </div>
          <div className="labelContainer">
            <span id="label">Phone Number</span>
            <TextField
              disabled
              className="textBox"
              sx={{ width: "75%" }}
              id="outlined-basic"
              name="asdf"
              variant="outlined"
              value={customer[0]?.phone}
            />
          </div>
          <div className="labelContainer">
            <span id="label">Balance</span>
            <TextField
              disabled
              className="textBox"
              sx={{ width: "75%" }}
              id="outlined-basic"
              name="asdf"
              variant="outlined"
              value={"₹ " + customer[0]?.balance}
            />
          </div>
        </div>
      </Paper>
      
    </>
  );
};

export default Add;
