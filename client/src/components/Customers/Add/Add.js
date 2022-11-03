import React, { useState } from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch } from "react-redux";
import "./Add.css";
import Toast from "../../Toast/Toast";
import { addCustomer } from "../../../action";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const Add = (props) => {
  const mainAreaList = [
    "Ammapet",
    "aiasf",
    "Gorimedu",
    "Yercaurd",
    "Kadiayampatti",
  ];
  var initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    mainArea: "",
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [btnText, setBtnText] = useState("Edit");
  const [errors, setErrors] = useState({ ...initialState });
  if (props.details) {
    initialState = props.details;
  }

  const [customer, setCustomer] = useState(initialState);
  const handleForm = (e) => {
    console.log("E", e);
    if (e.target.name === "mainArea")
      setCustomer({ ...customer, mainArea: e.target.textContent });
    else setCustomer({ ...customer, [e.target.name]: e.target.value });
    validation({ [e.target.name]: e.target.value });
    console.log(customer);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validation = (fieldValues = customer) => {
    let temp = { ...errors };
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length === 0 ? "Enter Your Name" : "";

    if ("email" in fieldValues)
      temp.email = !emailRegex.test(fieldValues.email) ? "Invalid Email" : "";

    if ("phone" in fieldValues) {
      if (fieldValues.phone.length != 10) temp.phone = "Invalid phone number";
      else temp.phone = "";
    }
    if ("address" in fieldValues)
      temp.address =
        fieldValues.address.length === 0 ? "Enter your address" : "";

    setErrors({
      ...temp,
    });
    if (fieldValues === customer)
      return Object.values(temp).every((val) => val === "");
  };
  const submitForm = () => {
    if (validation()) {
      dispatch(addCustomer(customer, navigate));
    }
  };
  const handleBtnChange = () => {
    console.log("hi");
    setIsDisabled(false);
    setBtnText("Update");
    // if()    
  };
  const handleCancelChange = () => {
    setIsDisabled(true);
    setBtnText("Edit");
  };
  return (
    <div className="addCustomerContainer">
      <Toast />
      <div className="formContainer">
        {props.details ? (
          <TextField
            className="textBox"
            value={props.details.cusId}
            id="outlined-basic"
            label="Customer Id"
            disabled
            sx={{ width: 300 }}
            variant="outlined"
          />
        ) : (
          <></>
        )}
        <TextField
          disabled={props.details ? isDisabled : !isDisabled}
          className="textBox"
          id="outlined-basic"
          onChange={handleForm}
          sx={{ width: 300 }}
          required
          name="name"
          label="Name"
          variant="outlined"
          value={customer.name}
          error={errors.name !== ""}
          helperText={errors.name}
        />
        <TextField
          className="textBox"
          id="outlined-basic"
          disabled={props.details ? isDisabled : !isDisabled}
          onChange={handleForm}
          sx={{ width: 300 }}
          label="Email"
          variant="outlined"
          value={customer.email}
          name="email"
          error={errors.email !== ""}
          helperText={errors.email}
        />
        <TextField
          className="textBox"
          id="outlined-basic"
          sx={{ width: 300 }}
          label="Phone"
          required
          type="phone"
          disabled={props.details ? isDisabled : !isDisabled}
          onChange={handleForm}
          variant="outlined"
          value={customer.phone}
          name="phone"
          error={errors.phone !== ""}
          helperText={errors.phone}
        />
        <TextField
          className="textBox"
          id="filled-textarea"
          value={customer.address}
          sx={{ width: 300 }}
          label="Address"
          onChange={handleForm}
          multiline
          required
          disabled={props.details ? isDisabled : !isDisabled}
          variant="outlined"
          name="address"
          error={errors.address !== ""}
          helperText={errors.address}
        />
        <TextField
          className="textBox"
          value={customer.gstNumber}
          id="outlined-basic"
          label="GST Number"
          disabled={props.details ? isDisabled : !isDisabled}
          onChange={handleForm}
          sx={{ width: 300 }}
          name="gstNumber"
          variant="outlined"
          error={errors.gstNumber !== ""}
          helperText={errors.gstNumber}
        />
        {props.details ? (
          <>
            <Autocomplete
              className="textBox"
              autoHighlight
              id="auto-highlight"
              options={mainAreaList}
              sx={{ width: 300 }}
              disabled={props.details ? isDisabled : !isDisabled}
              name="mainArea"
              onChange={handleForm}
              defaultValue={props.details.mainArea}
              renderInput={(params) => (
                <TextField {...params} label="Main Area" />
              )}
            />
          </>
        ) : (
          <Autocomplete
            className="textBox"
            autoHighlight
            id="auto-highlight"
            options={mainAreaList}
            sx={{ width: 300 }}
            name="mainArea"
            onChange={handleForm}
            renderInput={(params) => (
              <TextField {...params} label="Main Area" />
            )}
          />
        )}
      </div>
      <div className="btnContainer">
        {props.details ? (
          <>
            <Button
              variant="contained"
              onClick={handleBtnChange}
              startIcon={<BorderColorIcon />}
            >
              {btnText}
            </Button>
            {!isDisabled ? (
              <Button
                variant="contained"
                startIcon={<CancelRoundedIcon />}
                onClick={handleCancelChange}
                color="error"
              >
                Cancel
              </Button>
            ) : (
              <></>
            )}

            <Button
              variant="contained"
              color="error"
              startIcon={<PersonRemoveIcon />}
            >
              Delete Customer
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              onClick={() => submitForm()}
              startIcon={<GroupAddIcon />}
              color="success"
            >
              Add Customer
            </Button>
            <Button
              variant="contained"
              onClick={() => setCustomer(initialState)}
              startIcon={<RestartAltIcon />}
            >
              Reset all
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Add;
